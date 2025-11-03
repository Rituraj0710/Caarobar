import request from 'supertest';
import app from '../src/app';
describe('POST /auth/request-otp', () => {
    it('returns 200 with masked destination and ttlSeconds', async () => {
        const res = await request(app)
            .post('/auth/request-otp')
            .send({ identifier: '+919406038554' })
            .expect(200);
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('destination');
        expect(res.body).toHaveProperty('ttlSeconds');
        expect(typeof res.body.destination).toBe('string');
        expect(res.body.ttlSeconds).toBeGreaterThanOrEqual(30);
    });
});
//# sourceMappingURL=auth.e2e.test.js.map