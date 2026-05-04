const request = require('supertest');
const app = require('./server');
const pool = require('./db_config');

describe('User Registration Integration', () => {
    
    const testEmail = 'test.sajid@example.com';
    const testName = 'Sajid';

    // clean up before each test to ensure clean state
    beforeEach(async () => {
        await pool.query("DELETE FROM users WHERE email = $1", [testEmail]);
    });

    // clean up after all tests
    afterAll(async () => {
        await pool.query("DELETE FROM users WHERE email = $1", [testEmail]);
        await pool.end();
    });

    test('should successfully register a new user and verify in database', async () => {
        // Make the POST request to register a user
        const res = await request(app)
            .post('/users')
            .send({
                name: testName,
                email: testEmail
            });

        // Verify the response
        expect(res.statusCode).toBe(201);
        expect(res.body.email).toBe(testEmail);
        expect(res.body.name).toBe(testName);
        expect(res.body.id).toBeDefined();

        // Verify the user is actually stored in the database
        const dbResult = await pool.query('SELECT * FROM users WHERE email = $1', [testEmail]);
        expect(dbResult.rows).toHaveLength(1);
        expect(dbResult.rows[0].name).toBe(testName);
        expect(dbResult.rows[0].email).toBe(testEmail);
    });

    test('should not create a user with missing email', async () => {
        const res = await request(app)
            .post('/users')
            .send({
                name: testName
            });

        // Should fail or return an error
        expect(res.statusCode).not.toBe(201);
    });

    test('should not create a user with missing name', async () => {
        const res = await request(app)
            .post('/users')
            .send({
                email: testEmail
            });

        // Should fail or return an error
        expect(res.statusCode).not.toBe(201);
    });
});