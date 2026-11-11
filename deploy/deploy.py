import os
import sys
import json
import urllib.request
import paramiko

# Ensure UTF-8 output
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

def report_log(message):
    try:
        data = json.dumps({"message": message}).encode("utf-8")
        req = urllib.request.Request(
            "https://freeebies.site/api/deploy-log",
            data=data,
            headers={"Content-Type": "application/json", "User-Agent": "FreebiesCI/1.0"},
            method="POST"
        )
        with urllib.request.urlopen(req, timeout=10) as resp:
            pass
    except Exception as e:
        print(f"Could not report log to server: {e}", file=sys.stderr)

def get_clean_env(*keys):
    for key in keys:
        val = os.environ.get(key)
        if val and val.strip().lower() not in ('true', 'false', 'none', 'null', ''):
            clean = val.strip()
            clean = clean.replace('https://', '').replace('http://', '').split('/')[0]
            return clean
    return None

report_log("Starting deployment script execution on GitHub runner.")

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
                report_log(f"SSH connection succeeded to {target_host}:{port} as {target_user}")
                break
            except paramiko.AuthenticationException:
                msg = f"Auth failed on {target_host} for user {target_user}"
                print(msg)
                report_log(msg)
            except Exception as e:
                msg = f"Conn failed to {target_host}:{port}: {type(e).__name__}: {e}"
                print(msg)
                report_log(msg)
        if connected:
            break
    if connected:
        break

if not connected:
    err = "Fatal: Could not authenticate to production host using configured credentials."
    print(err, file=sys.stderr)
    report_log(err)
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
pnpm install

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
    err_msg = f"Deployment script exited with error code {exit_code}"
    print(err_msg, file=sys.stderr)
    report_log(err_msg)
    sys.exit(exit_code)
else:
    success_msg = "Continuous deployment pipeline completed successfully with exit code 0."
    print(success_msg)
    report_log(success_msg)
