module.exports = {
  apps: [
    {
      name: 'freebies',
      script: 'server.mjs',
      cwd: process.env.APP_DIR || '/root/streaming',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
