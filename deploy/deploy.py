import os
import sys
import paramiko

# Ensure UTF-8 output
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

def get_clean_env(*keys, fallback=""):
    """
    Safely retrieves first non-empty, non-boolean environment variable,
    filtering out GitHub Actions boolean string coercion ('true'/'false').
    """
    for key in keys:
        val = os.environ.get(key)
        if val and val.strip().lower() not in ('true', 'false', 'none', 'null', ''):
            return val.strip()
    return fallback

host = get_clean_env('SSH_HOST', 'DEPLOY_HOST', 'SERVER_HOST', 'HOST', fallback='157.173.125.157')
user = get_clean_env('SSH_USER', 'DEPLOY_USER', 'SERVER_USER', 'USER', fallback='steveyout')
passw = get_clean_env('SSH_PASS', 'DEPLOY_PASSWORD', 'SERVER_PASSWORD', 'VPS_PASSWORD', 'PASSWORD', fallback='bxw30RpaZdRYLQaQ')
port_str = get_clean_env('SSH_PORT', 'DEPLOY_PORT', 'PORT', fallback='22')

try:
    port = int(port_str)
except ValueError:
    port = 22

print(f"Connecting to production host at {host}:{port} as {user}...")

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

try:
    ssh.connect(host, port=port, username=user, password=passw, timeout=30)
    print("SSH connection successfully established.")
except Exception as e:
    print(f"Failed to connect to host {host}:{port}: {e}", file=sys.stderr)
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
