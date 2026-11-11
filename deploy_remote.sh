#!/bin/bash
set -e

echo "=== [1/7] Setting up environment paths ==="
export PATH="/home/steveyout/.nvm/versions/node/v22.22.3/bin:$PATH:/usr/local/bin:/usr/bin:/bin"
export NVM_DIR="/home/steveyout/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
nvm use 22 || true

echo "Node version: $(node -v)"
echo "pnpm version: $(pnpm -v)"
echo "PM2 version: $(pm2 -v)"

echo "=== [2/7] Preparing project directory in ~/streaming/freebies ==="
mkdir -p /home/steveyout/streaming
cd /home/steveyout/streaming

if [ ! -d "freebies" ]; then
    echo "Cloning repository..."
    git clone https://github.com/steveyout/Freebies.git freebies
fi

cd freebies
git fetch origin main
git reset --hard origin/main

echo "=== [3/7] Setting up MySQL Database ==="
echo "bxw30RpaZdRYLQaQ" | sudo -S mysql -e "CREATE DATABASE IF NOT EXISTS freebies_directory CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
echo "bxw30RpaZdRYLQaQ" | sudo -S mysql -e "CREATE USER IF NOT EXISTS 'freebies_user'@'localhost' IDENTIFIED BY 'bxw30RpaZdRYLQaQ';"
echo "bxw30RpaZdRYLQaQ" | sudo -S mysql -e "GRANT ALL PRIVILEGES ON freebies_directory.* TO 'freebies_user'@'localhost';"
echo "bxw30RpaZdRYLQaQ" | sudo -S mysql -e "FLUSH PRIVILEGES;"

echo "=== [4/7] Generating .env configuration ==="
cat > .env << 'EOF'
PORT=3050
NODE_ENV=production
DB_DIALECT=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=freebies_directory
DB_USER=freebies_user
DB_PASSWORD=bxw30RpaZdRYLQaQ
JWT_SECRET=freebies-super-secret-jwt-key-2026-secure
NEXT_PUBLIC_GA_ID=G-HHK1B8QGWH
EOF

echo "=== [5/7] Installing dependencies & Building ==="
pnpm install --frozen-lockfile
pnpm run db:sync
pnpm run build

echo "=== [6/7] Managing PM2 Process on Port 3050 ==="
if pm2 list | grep -q "freebies"; then
    pm2 reload deploy/ecosystem.config.cjs --update-env
else
    pm2 start deploy/ecosystem.config.cjs
fi
pm2 save

echo "=== [7/7] Configuring BunkerWeb for freeebies.site ==="
cat > /tmp/setup_bw_freebies.sql << 'EOF'
INSERT INTO bw_services (id, method, is_draft, creation_date, last_update)
VALUES ('freeebies.site', 'ui', false, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO bw_services_settings (service_id, setting_id, value)
VALUES 
  ('freeebies.site', 'SERVER_NAME', 'freeebies.site www.freeebies.site'),
  ('freeebies.site', 'USE_REVERSE_PROXY', 'yes'),
  ('freeebies.site', 'REVERSE_PROXY_HOST', 'http://localhost:3050'),
  ('freeebies.site', 'REVERSE_PROXY_WS', 'yes'),
  ('freeebies.site', 'AUTO_LETS_ENCRYPT', 'yes'),
  ('freeebies.site', 'USE_TEMPLATE', 'low')
ON CONFLICT (service_id, setting_id) 
DO UPDATE SET value = EXCLUDED.value;
EOF

echo "bxw30RpaZdRYLQaQ" | sudo -S -u postgres psql -d bw_db -f /tmp/setup_bw_freebies.sql

# Trigger BunkerWeb reload
echo "bxw30RpaZdRYLQaQ" | sudo -S systemctl reload bunkerweb || true
echo "bxw30RpaZdRYLQaQ" | sudo -S systemctl restart bunkerweb-scheduler || true

echo "=== VERIFYING DEPLOYMENT ==="
sleep 3
curl -I http://127.0.0.1:3050 || echo "Port 3050 checking..."
echo "Deployment fully completed!"
