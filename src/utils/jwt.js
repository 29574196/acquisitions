import jwt from 'jsonwebtoken';
import logger from '../config/logger.js';

const JWT_SECRET = process.env.JWT_SECRET || 'please-change-key';
const JWT_EXPIRES_IN = '1d';

export const jwttoken = {
  sign: payload => {
    try {
      return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      });
    } catch (err) {
      logger.error('Unable to verify JWT token', err);
      throw new Error('Failed to authenticate JWT token');
    }
  },
  verify: token => {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (err) {
      logger.error('Unable to verify JWT token', err);
      throw new Error('Failed to verify JWT token');
    }
  },
};
