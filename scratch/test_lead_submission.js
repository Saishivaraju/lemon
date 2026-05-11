const axios = require('axios');

async function testLeadSubmission() {
  const lead = {
    name: 'Automation Test',
    phone: '+1 754 291 7462', // User's number
    email: 'saishivaraju.m2002@gmail.com',
    property_interest: 'Test Property',
    source: 'Website'
  };

  console.log('🚀 Submitting lead to /api/leads...');
  try {
    const res = await axios.post('http://localhost:5000/api/leads', { lead });
    console.log('✅ Response:', res.data);
  } catch (err) {
    console.error('❌ Error:', err.response ? err.response.data : err.message);
  }
}

testLeadSubmission();
