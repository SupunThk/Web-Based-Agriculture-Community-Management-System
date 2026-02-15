const axios = require('axios');

async function testLogin() {
    try {
        const uniqueEmail = `login_test_${Date.now()}@example.com`;
        const password = 'password123';

        // 1. Register
        console.log(`1. Registering user: ${uniqueEmail}`);
        await axios.post('http://localhost:5000/api/auth/register', {
            name: 'Login Tester',
            email: uniqueEmail,
            password: password,
            role: 'user'
        });
        console.log('   Registration successful.');

        // 2. Login
        console.log(`2. Attempting to login with: ${uniqueEmail}`);
        const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
            email: uniqueEmail,
            password: password
        });

        console.log('   Login Response Status:', loginResponse.status);

        if (loginResponse.status === 200 && loginResponse.data.token) {
            console.log('SUCCESS: Login successful. JWT Token received.');
            console.log('Token:', loginResponse.data.token.substring(0, 20) + '...');
        } else {
            console.log('FAILED: Login failed or no token received.');
        }

    } catch (error) {
        console.error('ERROR during login test:', error.response ? error.response.data : error.message);
    }
}

testLogin();
