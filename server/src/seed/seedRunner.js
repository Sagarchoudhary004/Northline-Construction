import databaseConnection from '../config/db.js';
import { ensureSeedData } from './seedData.js';

async function run() {
  try {
    await databaseConnection.connect();
    await ensureSeedData();
    console.log('[Seed] Database seeding complete.');
    await databaseConnection.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('[Seed] Failed:', err);
    process.exit(1);
  }
}

run();
