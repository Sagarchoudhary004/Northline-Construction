import app from '../server/src/app.js';
import databaseConnection from '../server/src/config/db.js';
import { ensureSeedData } from '../server/src/seed/seedData.js';

let seedPromise = null;

async function ensureReady() {
    await databaseConnection.connect();
    if (!seedPromise) {
        seedPromise = ensureSeedData().catch((err) => {
            seedPromise = null;
            throw err;
        });
    }
    await seedPromise;
}

export default async function handler(req, res) {
    await ensureReady();
    return app(req, res);
}

