import request from 'supertest';
import { describe, expect, test } from '@jest/globals';
import { app } from '../server.js';

// Register User
describe('POST /api/users/register', () => {
    test('should register a new user', async () => {
        const response = await request(app)
            .post('/register')
            .send({ name: 'John Doe', email: 'johndoe@example.com', password: 'password123' });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('token');
    });
});

// // Login User
// describe('POST /login', () => {
//     test('should login an existing user', async () => {
//         const response = await request(app)
//             .post('/login')
//             .send({ email: 'johndoe@example.com', password: 'password123' });

//         expect(response.statusCode).toBe(200);
//         expect(response.body).toHaveProperty('token');
//     });

//     test('should return an error for invalid credentials', async () => {
//         const response = await request(app)
//             .post('/login')
//             .send({ email: 'johndoe@example.com', password: 'incorrectpassword' });

//         expect(response.statusCode).toBe(401);
//         expect(response.body).toHaveProperty('message', 'Invalid email or password');
//     });
// });

// // Logout User
// describe('GET /logout', () => {
//     test('should logout the user', async () => {
//         const response = await request(app).get('/logout');

//         expect(response.statusCode).toBe(200);
//         expect(response.body).toHaveProperty('success', true);
//         expect(response.body).toHaveProperty('message', 'Logged Out');
//         expect(response.headers['set-cookie']).toBeDefined();
//     });
// });

// // Forgot Password
// describe('POST /password/forgot', () => {
//     test('should send a password reset email', async () => {
//         const response = await request(app)
//             .post('/password/forgot')
//             .send({ email: 'johndoe@example.com' });

//         expect(response.statusCode).toBe(200);
//         expect(response.body).toHaveProperty('success', true);
//         expect(response.body).toHaveProperty('message', 'Email sent to johndoe@example.com successfully');
//     });

//     test('should return an error for a non-existing user', async () => {
//         const response = await request(app)
//             .post('/password/forgot')
//             .send({ email: 'nonexistinguser@example.com' });

//         expect(response.statusCode).toBe(404);
//         expect(response.body).toHaveProperty('message', 'User not found');
//     });
// });

// // Reset Password
// describe('PUT /reset/:token', () => {
//     let resetToken;

//     beforeAll(async () => {
//         // Generate a reset token for testing
//         const response = await request(app)
//             .post('/password/forgot')
//             .send({ email: 'johndoe@example.com' });

//         resetToken = response.body.resetToken;
//     });

//     test('should reset the user password', async () => {
//         const response = await request(app)
//             .put(`/reset/${resetToken}`)
//             .send({ password: 'newpassword123', confirmPassword: 'newpassword123' });

//         expect(response.statusCode).toBe(200);
//         expect(response.body).toHaveProperty('token');
//     });

//     test('should return an error for an invalid token', async () => {
//         const response = await request(app)
//             .put('/reset/invalidtoken')
//             .send({ password: 'newpassword123', confirmPassword: 'newpassword123' });

//         expect(response.statusCode).toBe(400);
//         expect(response.body).toHaveProperty('message', 'Invalid reset token');
//     });
// });

// // Get User Details
// describe('GET /me', () => {
//     let authToken;

//     beforeAll(async () => {
//         // Login user and obtain auth token for testing
//         const response = await request(app)
//             .post('/login')
//             .send({ email: 'johndoe@example.com', password: 'newpassword123' });

//         authToken = response.body.token;
//     });

//     test('should get the user details', async () => {
//         const response = await request(app)
//             .get('/me')
//             .set('Authorization', `Bearer ${authToken}`);

//         expect(response.statusCode).toBe(200);
//         expect(response.body).toHaveProperty('name', 'John Doe');
//         expect(response.body).toHaveProperty('email', 'johndoe@example.com');
//     });

//     test('should return an error for an invalid token', async () => {
//         const response = await request(app)
//             .get('/me')
//             .set('Authorization', 'Bearer invalidtoken');

//         expect(response.statusCode).toBe(401);
//         expect(response.body).toHaveProperty('message', 'Unauthorized');
//     });
// });

// // Update Password
// describe('PUT /password/update', () => {
//     let authToken;

//     beforeAll(async () => {
//         // Login user and obtain auth token for testing
//         const response = await request(app)
//             .post('/login')
//             .send({ email: 'johndoe@example.com', password: 'newpassword123' });

//         authToken = response.body.token;
//     });

//     test('should update the user password', async () => {
//         const response = await request(app)
//             .put('/password/update')
//             .set('Authorization', `Bearer ${authToken}`)
//             .send({ oldPassword: 'newpassword123', newPassword: 'updatedpassword123', confirmPassword: 'updatedpassword123' });

//         expect(response.statusCode).toBe(200);
//         expect(response.body).toHaveProperty('token');
//     });

//     test('should return an error for an invalid old password', async () => {
//         const response = await request(app)
//             .put('/password/update')
//             .set('Authorization', `Bearer ${authToken}`)
//             .send({ oldPassword: 'invalidpassword', newPassword: 'updatedpassword123', confirmPassword: 'updatedpassword123' });

//         expect(response.statusCode).toBe(401);
//         expect(response.body).toHaveProperty('message', 'Invalid password');
//     });
// });

// // Update Profile
// describe('PUT /me/update', () => {
//     let authToken;

//     beforeAll(async () => {
//         // Login user and obtain auth token for testing
//         const response = await request(app)
//             .post('/login')
//             .send({ email: 'johndoe@example.com', password: 'updatedpassword123' });

//         authToken = response.body.token;
//     });

//     test('should update the user profile', async () => {
//         const response = await request(app)
//             .put('/me/update')
//             .set('Authorization', `Bearer ${authToken}`)
//             .send({ name: 'John Smith', email: 'johnsmith@example.com' });

//         expect(response.statusCode).toBe(200);
//         expect(response.body).toHaveProperty('name', 'John Smith');
//         expect(response.body).toHaveProperty('email', 'johnsmith@example.com');
//     });

//     test('should return an error for an invalid token', async () => {
//         const response = await request(app)
//             .put('/me/update')
//             .set('Authorization', 'Bearer invalidtoken')
//             .send({ name: 'John Smith', email: 'johnsmith@example.com' });

//         expect(response.statusCode).toBe(401);
//         expect(response.body).toHaveProperty('message', 'Unauthorized');
//     });
// });
