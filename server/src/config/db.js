import mongoose from 'mongoose';
import env from './env.js';

/**
 * Singleton pattern for MongoDB connection lifecycle.
 */
class DatabaseConnection {
  static instance = null;

  constructor() {
    if (DatabaseConnection.instance) {
      return DatabaseConnection.instance;
    }
    this.isConnected = false;
    DatabaseConnection.instance = this;
  }

  async connect(uri = env.mongoUri) {
    if (this.isConnected && mongoose.connection.readyState === 1) {
      return mongoose.connection;
    }

    mongoose.set('strictQuery', true);
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15000,
      family: 4,
    });
    this.isConnected = true;
    console.log(`[MongoDB] Connected: ${conn.connection.host}/${conn.connection.name}`);
    return conn.connection;
  }

  async disconnect() {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      this.isConnected = false;
    }
  }
}

export default new DatabaseConnection();
