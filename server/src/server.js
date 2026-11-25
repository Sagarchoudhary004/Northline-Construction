import app from './app.js';
import env from './config/env.js';
import databaseConnection from './config/db.js';
import { ensureSeedData } from './seed/seedData.js';

async function bootstrap() {
  try {
    await databaseConnection.connect();
    await ensureSeedData();

    app.listen(env.port, () => {
      console.log(`[Server] Northline Build API running on http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error('[Server] Startup failed:', error.message);
    process.exit(1);
  }
}

bootstrap();
