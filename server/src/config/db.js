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
    this.connectingPromise = null;
    DatabaseConnection.instance = this;
  }

  async connect(uri = env.mongoUri) {
    if (this.isConnected && mongoose.connection.readyState === 1) {
      return mongoose.connection;
    }

    if (this.connectingPromise) {
      return this.connectingPromise;
    }

    mongoose.set('strictQuery', true);
    this.connectingPromise = mongoose
      .connect(uri, {
        serverSelectionTimeoutMS: 15000,
        family: 4,
      })
      .then((conn) => {
        this.isConnected = true;
        console.log(`[MongoDB] Connected: ${conn.connection.host}/${conn.connection.name}`);
        return conn.connection;
      })
      .finally(() => {
        this.connectingPromise = null;
      });

    return this.connectingPromise;
  }

  async disconnect() {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      this.isConnected = false;
    }
  }
}

export default new DatabaseConnection();
