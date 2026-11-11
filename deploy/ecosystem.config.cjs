module.exports = {
  apps: [
    {
      name: 'freebies',
      script: 'server.mjs',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 3050,
      },
    },
  ],
};
