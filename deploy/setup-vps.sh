#!/usr/bin/env bash
set -e

# ==============================================================================
# VPS Setup & Deployment Helper for freeebies.site
# Target Directory: streaming
# Web Server / WAF: BunkerWeb
# ==============================================================================

echo "🚀 Initializing Freebies VPS deployment under 'streaming' directory..."

APP_DIR="${APP_DIR:-$HOME/streaming}"
REPO_URL="https://github.com/steveyout/Freebies.git"

# 1. Verify / Install Node.js, pnpm, PM2
if ! command -v node >/dev/null 2>&1; then
    echo "📦 Installing Node.js 22 LTS..."
    curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
    apt-get install -y nodejs
fi

if ! command -v pnpm >/dev/null 2>&1; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm pm2
fi

if ! command -v pm2 >/dev/null 2>&1; then
    echo "📦 Installing PM2 process manager..."
    npm install -g pm2
fi

# 2. Setup Directory and Git Repository
if [ ! -d "$APP_DIR" ]; then
    echo "📁 Creating streaming directory at $APP_DIR..."
    git clone "$REPO_URL" "$APP_DIR"
    cd "$APP_DIR"
else
    echo "🔄 Navigating to existing directory $APP_DIR..."
    cd "$APP_DIR"
    git fetch origin main
    git reset --hard origin/main
fi

# 3. Environment Configuration
if [ ! -f ".env" ]; then
    echo "⚙️ Creating default .env file..."
    cp .env.example .env
    # Generate random JWT secret if not configured
    RANDOM_JWT=$(openssl rand -hex 32 2>/dev/null || date +%s | sha256sum | base64 | head -c 32)
    sed -i "s/freebies-super-secret-jwt-key-2026-secure/$RANDOM_JWT/" .env
fi

# 4. Install Dependencies & Build
echo "📦 Installing project dependencies via pnpm..."
pnpm install --frozen-lockfile

echo "🔄 Safely merging resources into production database (preserving votes & comments)..."
pnpm run db:sync

echo "🏗️ Building Next.js production bundle..."
pnpm run build

# 5. Process Management via PM2
echo "⚡ Starting / reloading application with PM2..."
if pm2 list | grep -q "freebies"; then
    pm2 reload deploy/ecosystem.config.cjs --update-env
else
    pm2 start deploy/ecosystem.config.cjs
fi
pm2 save

# 6. BunkerWeb Configuration Mapping
echo "🛡️ Configuring BunkerWeb reverse proxy for freeebies.site..."
BUNKERWEB_CONFIG_DIR="/etc/bunkerweb/configs"
if [ -d "$BUNKERWEB_CONFIG_DIR" ]; then
    cp bunkerweb/freeebies.site.conf "$BUNKERWEB_CONFIG_DIR/freeebies.site.conf"
    echo "✅ Linked BunkerWeb configuration to $BUNKERWEB_CONFIG_DIR/freeebies.site.conf"
    
    # Reload BunkerWeb if service exists
    if systemctl is-active --quiet bunkerweb; then
        systemctl reload bunkerweb || true
    fi
fi

# If BunkerWeb runs inside Docker:
if docker ps --format '{{.Names}}' | grep -q "bunkerweb"; then
    echo "🐳 Found BunkerWeb Docker container. Injecting config..."
    docker exec -i bunkerweb mkdir -p /etc/bunkerweb/configs || true
    docker cp bunkerweb/freeebies.site.conf bunkerweb:/etc/bunkerweb/configs/freeebies.site.conf || true
    docker exec -i bunkerweb bunkercli reload || docker restart bunkerweb || true
fi

echo "🎉 Deployment successful! freeebies.site is online and protected behind BunkerWeb."
