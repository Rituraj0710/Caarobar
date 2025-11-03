import request from 'supertest';
import app from '../src/app';
import { env } from '../src/env';

describe('Auth Dev Bypass', () => {
  const devIdentifier = env.DEV_BYPASS_IDENTIFIER;
  const nonDevIdentifier = '1234567890';

  beforeEach(() => {
    // Reset environment for each test
    process.env.NODE_ENV = 'development';
    process.env.DEV_BYPASS_ENABLED = 'true';
  });

  afterEach(() => {
    // Clean up
    delete process.env.NODE_ENV;
    delete process.env.DEV_BYPASS_ENABLED;
  });

  describe('POST /auth/verify-otp', () => {
    it('should bypass OTP verification for dev identifier when enabled', async () => {
      const response = await request(app)
        .post('/auth/verify-otp')
        .send({
          identifier: devIdentifier,
          otp: '1234' // Any OTP should work for dev bypass
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.token).toBeDefined();
      expect(response.body.user).toBeDefined();
      expect(response.body.user.name).toBe(env.DEV_BYPASS_NAME);
    });

    it('should require normal OTP verification for non-dev identifier', async () => {
      const response = await request(app)
        .post('/auth/verify-otp')
        .send({
          identifier: nonDevIdentifier,
          otp: '1234'
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('OTP not found or expired');
    });

    it('should disable bypass in production environment', async () => {
      process.env.NODE_ENV = 'production';
      process.env.DEV_BYPASS_ENABLED = 'true';

      const response = await request(app)
        .post('/auth/verify-otp')
        .send({
          identifier: devIdentifier,
          otp: '1234'
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('OTP not found or expired');
    });

    it('should disable bypass when DEV_BYPASS_ENABLED is false', async () => {
      process.env.DEV_BYPASS_ENABLED = 'false';

      const response = await request(app)
        .post('/auth/verify-otp')
        .send({
          identifier: devIdentifier,
          otp: '1234'
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('OTP not found or expired');
    });

    it('should return valid JWT token with correct payload', async () => {
      const response = await request(app)
        .post('/auth/verify-otp')
        .send({
          identifier: devIdentifier,
          otp: '1234'
        });

      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();

      // Verify JWT token
      const jwt = require('jsonwebtoken');
      const decoded = jwt.verify(response.body.token, env.JWT_SECRET);
      
      expect(decoded.userId).toBeDefined();
      expect(decoded.role).toBe('ADMIN');
      expect(decoded.email || decoded.phone).toBe(devIdentifier);
    });
  });

  describe('GET /users/me', () => {
    it('should return user data with valid dev bypass token', async () => {
      // First get a token via bypass
      const authResponse = await request(app)
        .post('/auth/verify-otp')
        .send({
          identifier: devIdentifier,
          otp: '1234'
        });

      expect(authResponse.status).toBe(200);
      const token = authResponse.body.token;

      // Use token to get user data
      const userResponse = await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${token}`);

      expect(userResponse.status).toBe(200);
      expect(userResponse.body.success).toBe(true);
      expect(userResponse.body.user).toBeDefined();
      expect(userResponse.body.user.name).toBe(env.DEV_BYPASS_NAME);
    });
  });
});
