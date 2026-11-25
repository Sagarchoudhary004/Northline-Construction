


import app from './app.js';
import env from './config/env.js';
import databaseConnection from './config/db.js';
import { ensureSeedData } from './seed/seedData.js';

let isInitialized = false;

async function init() {
  if (isInitialized) return;
  await databaseConnection.connect();
  await ensureSeedData();
  isInitialized = true;
}

// Local laptop 
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  init()
    .then(() => {
      app.listen(env.port, () => {
        console.log(`[Server] Northline Build API running on http://localhost:${env.port}`);
      });
    })
    .catch((error) => {
      console.error('[Server] Startup failed:', error.message);
      process.exit(1);
    });
}

// Vercel 
export default async function handler(req, res) {
  try {
    await init();
    return app(req, res);
  } catch (error) {
    console.error('[Server] Vercel handler error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
