import os
import sys
import paramiko

# Ensure UTF-8 output
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

def get_clean_env(*keys):
    for key in keys:
        val = os.environ.get(key)
        if val and val.strip().lower() not in ('true', 'false', 'none', 'null', ''):
            return val.strip()
    return None

env_host = get_clean_env('SSH_HOST', 'DEPLOY_HOST', 'SERVER_HOST', 'HOST', 'VPS_HOST')
env_user = get_clean_env('SSH_USER', 'DEPLOY_USER', 'SERVER_USER', 'USER', 'VPS_USERNAME')
env_pass = get_clean_env('SSH_PASS', 'DEPLOY_PASSWORD', 'SERVER_PASSWORD', 'VPS_PASSWORD', 'PASSWORD')
port_str = get_clean_env('SSH_PORT', 'DEPLOY_PORT', 'PORT', 'VPS_PORT')

hosts_to_try = [h for h in [env_host, '157.173.125.157'] if h]
users_to_try = [u for u in [env_user, 'steveyout'] if u]
passwords_to_try = [p for p in [env_pass, 'bxw30RpaZdRYLQaQ'] if p]

try:
    port = int(port_str) if port_str else 22
except ValueError:
    port = 22

# Deduplicate preserving order
hosts_to_try = list(dict.fromkeys(hosts_to_try))
users_to_try = list(dict.fromkeys(users_to_try))
passwords_to_try = list(dict.fromkeys(passwords_to_try))

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
                ssh.connect(target_host, port=port, username=target_user, password=target_pass, timeout=25)
                print(f"SSH authentication verified successfully on {target_host}.")
                connected = True
                active_host = target_host
                active_user = target_user
                break
            except paramiko.AuthenticationException:
                print(f"Authentication with credentials for {target_user} rejected by server. Trying next...")
            except Exception as e:
                print(f"Connection attempt to {target_host}:{port} failed: {e}")
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
    print(f"Deployment script exited with error code {exit_code}", file=sys.stderr)
    sys.exit(exit_code)
else:
    print("Continuous deployment pipeline completed successfully with exit code 0.")
