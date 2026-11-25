import jwt from 'jsonwebtoken';
import env from '../config/env.js';
import adminRepository from '../repositories/adminRepository.js';
import AppError from '../utils/AppError.js';

class AuthService {
  signToken(admin) {
    return jwt.sign(
      { sub: admin._id.toString(), email: admin.email, role: admin.role },
      env.jwtSecret,
      { expiresIn: env.jwtExpiresIn }
    );
  }

  async login(email, password) {
    if (!email || !password) {
      throw new AppError('Email and password are required.', 400);
    }

    const admin = await adminRepository.findByEmailWithPassword(email);
    if (!admin) {
      throw new AppError('Invalid email or password.', 401);
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      throw new AppError('Invalid email or password.', 401);
    }

    await adminRepository.updateLastLogin(admin._id);
    const token = this.signToken(admin);

    return {
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        lastLoginAt: new Date(),
      },
    };
  }

  async getProfile(adminId) {
    const admin = await adminRepository.findById(adminId);
    if (!admin) {
      throw new AppError('Admin account not found.', 404);
    }
    return {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      lastLoginAt: admin.lastLoginAt,
    };
  }
}

export default new AuthService();
