const axios = require('axios');

async function testRegistration() {
    try {
        const uniqueEmail = `testuser_${Date.now()}@example.com`;
        console.log(`Attempting to register user with email: ${uniqueEmail}`);

        const response = await axios.post('http://localhost:5000/api/auth/register', {
            name: 'Test User',
            email: uniqueEmail,
            password: 'password123',
            role: 'user'
        });

        console.log('Registration Response Status:', response.status);
        console.log('Registration Response Data:', response.data);

        if (response.status === 201) {
            console.log('SUCCESS: User registered and saved to MongoDB.');
        } else {
            console.log('FAILED: Unexpected status code.');
        }
    } catch (error) {
        console.error('ERROR during registration:', error.response ? error.response.data : error.message);
    }
}

testRegistration();
