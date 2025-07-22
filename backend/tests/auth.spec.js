const request = require('supertest');
const app = require("../server")

// Mock user data for testing
const mockUser = {
  full_name: 'QD',
  email: 'test@gmail.com',
  password: '123456',
  phone: '090999999',
  address_line_1: '123 CH, TB ',
  address_line_2: '456 CH, TB',
  city: 'HCM',
  state: 'TB',
  country: 'VN',
  nok_name: 'Q',
  nok_phone_number: '090999990'
};

describe('User API Endpoint Tests', () => {
  test('should failed when the email are duplicated', async () => {
    const res = await request(app)
      .post('/api/v1/register')
      .send(mockUser);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Email is duplicated.');
  });
});

// Test for GET /api/v1/profile/:userId
describe('GET /api/v1/profile/:userId', () => {
  test('should return 404 if user not found', async () => {
    const nonExistentUserId = '999'; // Assuming this user ID does not exist
    const response = await request(app).get(`/api/v1/profile/${nonExistentUserId}`);

    // Assert response status
    expect(response.status).toBe(401);
  });
});
