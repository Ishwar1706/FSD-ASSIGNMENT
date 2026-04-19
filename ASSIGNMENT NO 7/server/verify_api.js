const axios = require('axios');

const testRegistration = async () => {
    try {
        const res = await axios.post('http://localhost:5000/api/auth/register', {
            name: 'Verification User',
            email: 'verify@student.com',
            password: 'password123'
        });
        console.log('✅ Registration API Success:', res.data.user.email);

        const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'verify@student.com',
            password: 'password123'
        });
        console.log('✅ Login API Success:', loginRes.data.user.email);

    } catch (err) {
        console.error('❌ API Verification Failed:', err.response?.data || err.message);
    }
};

testRegistration();
