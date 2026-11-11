import { runDatabaseSeeders } from './seed';

async function main() {
  console.log('🌱 Starting freebies database seeders...');
  const res = await runDatabaseSeeders();
  if (res.success) {
    console.log('✨ Seeders completed successfully!');
    process.exit(0);
  } else {
    console.error('❌ Seeders failed:', res.message);
    process.exit(1);
  }
}

main();
