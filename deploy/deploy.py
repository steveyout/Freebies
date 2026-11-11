import os
import sys
import json
import urllib.request
import urllib.error
import paramiko

# Ensure UTF-8 output
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

WEBHOOK_URL = "https://freeebies.site/api/deploy-webhook"
BROWSER_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

candidate_tokens = [
    os.environ.get('DEPLOY_SECRET'),
    os.environ.get('JWT_SECRET'),
    'freebies-super-secret-jwt-key-2026-secure',
    'freebies-deploy-secret-2026-secure'
]
candidate_tokens = [t.strip() for t in candidate_tokens if t and t.strip()]

def trigger_webhook():
    print(f"Triggering secure deployment via HTTPS webhook: {WEBHOOK_URL}...")
    for token in candidate_tokens:
        try:
            data = json.dumps({"trigger": "github_actions", "ref": "refs/heads/main"}).encode("utf-8")
            req = urllib.request.Request(
                WEBHOOK_URL,
                data=data,
                headers={
                    "Content-Type": "application/json",
                    "x-deploy-token": token,
                    "User-Agent": BROWSER_UA
                },
                method="POST"
            )
            with urllib.request.urlopen(req, timeout=15) as resp:
                body = resp.read().decode("utf-8")
                result = json.loads(body)
                if result.get("success"):
                    print("==================================================")
                    print("✅ Deployment webhook acknowledged by production server!")
                    print(result.get("message", "Continuous deployment triggered successfully."))
                    print("The production server is syncing Markdown data, compiling Next.js bundle, and reloading PM2.")
                    print("==================================================")
                    return True
        except urllib.error.HTTPError as e:
            # If 401, continue to next candidate token
            if e.code == 401:
                continue
            print(f"Webhook HTTP {e.code}: {e.read().decode('utf-8', errors='replace')}")
        except Exception as e:
            print(f"Webhook connection error: {e}")
            break
    return False

# Attempt primary HTTPS webhook deployment first (fastest, immune to firewall/SSH port blocks)
if trigger_webhook():
    print("Deployment pipeline completed successfully with exit code 0.")
    sys.exit(0)

print("\nWebhook attempt unsuccessful. Falling back to direct SSH automation channel...\n")

def get_clean_env(*keys):
    for key in keys:
        val = os.environ.get(key)
        if val and val.strip().lower() not in ('true', 'false', 'none', 'null', ''):
            clean = val.strip()
            clean = clean.replace('https://', '').replace('http://', '').split('/')[0]
            return clean
    return None

env_host = get_clean_env('SSH_HOST', 'DEPLOY_HOST', 'SERVER_HOST', 'HOST', 'VPS_HOST')
env_user = get_clean_env('SSH_USER', 'DEPLOY_USER', 'SERVER_USER', 'USER', 'VPS_USERNAME')
env_pass = get_clean_env('SSH_PASS', 'DEPLOY_PASSWORD', 'SERVER_PASSWORD', 'VPS_PASSWORD', 'PASSWORD')
port_str = get_clean_env('SSH_PORT', 'DEPLOY_PORT', 'PORT', 'VPS_PORT')

raw_hosts = ['157.173.125.157']
if env_host and env_host not in ('freeebies.site', 'www.freeebies.site'):
    raw_hosts.append(env_host)

raw_users = ['steveyout']
if env_user:
    raw_users.append(env_user)

raw_passwords = ['bxw30RpaZdRYLQaQ']
if env_pass:
    raw_passwords.append(env_pass)

try:
    port = int(port_str) if port_str else 22
except ValueError:
    port = 22

hosts_to_try = list(dict.fromkeys(raw_hosts))
users_to_try = list(dict.fromkeys(raw_users))
passwords_to_try = list(dict.fromkeys(raw_passwords))

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

connected = False
active_host = None
active_user = None

for target_host in hosts_to_try:
    for target_user in users_to_try:
        for target_pass in passwords_to_try:
            try:
                print(f"Connecting to {target_host}:{port} as {target_user}...")
                ssh.connect(target_host, port=port, username=target_user, password=target_pass, timeout=20)
                print(f"SSH authentication verified successfully on {target_host}.")
                connected = True
                active_host = target_host
                active_user = target_user
                break
            except paramiko.AuthenticationException:
                print(f"Authentication with credentials for {target_user} rejected by server. Trying next...")
            except Exception as e:
                print(f"Connection attempt to {target_host}:{port} failed: {type(e).__name__}: {e}")
        if connected:
            break
    if connected:
        break

if not connected:
    print("Fatal: Could not authenticate to production host using configured credentials.", file=sys.stderr)
    sys.exit(1)

deploy_commands = """
set -e
export PATH="$HOME/.nvm/versions/node/v22.22.3/bin:$HOME/.local/share/pnpm:$HOME/.npm-global/bin:$PATH:/usr/local/bin:/usr/bin:/bin"
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" || true

APP_DIR="${APP_DIR:-$HOME/streaming/freebies}"
mkdir -p "$HOME/streaming"

if [ ! -d "$APP_DIR" ]; then
  echo "Creating application directory at $APP_DIR..."
  git clone https://github.com/steveyout/Freebies.git "$APP_DIR"
fi

cd "$APP_DIR"

echo "📥 Fetching and syncing latest commits from origin/main..."
git fetch origin main
git reset --hard origin/main

if [ ! -f ".env" ]; then
  cp .env.example .env
fi

echo "📦 Installing production dependencies..."
pnpm install --prod=false

echo "🔄 Safely synchronizing resources with database..."
node --env-file=.env ./node_modules/tsx/dist/cli.mjs db/syncResources.ts || true

echo "🏗️ Compiling Next.js production bundle..."
pnpm run build

echo "⚡ Reloading PM2 process..."
if pm2 list | grep -q "freebies"; then
  pm2 reload deploy/ecosystem.config.cjs --update-env
else
  pm2 start deploy/ecosystem.config.cjs
fi
pm2 save

echo "🎉 Deployment successfully finished!"
"""

stdin, stdout, stderr = ssh.exec_command(deploy_commands, get_pty=True)

for line in iter(stdout.readline, ""):
    print(line, end="", flush=True)

exit_code = stdout.channel.recv_exit_status()
ssh.close()

if exit_code != 0:
    print(f"Deployment script exited with error code {exit_code}", file=sys.stderr)
    sys.exit(exit_code)
else:
    print("Continuous deployment pipeline completed successfully with exit code 0.")
