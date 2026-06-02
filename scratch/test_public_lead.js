const fetch = require('node-fetch');

async function testLead() {
  const lead = {
    name: 'Test Lead',
    phone: '+15555555555', // Provide a mock phone
    email: 'test@example.com',
    property_interest: 'Luxury Villa',
    budget: '$1M - $2M',
    autoRespond: true
  };

  try {
    const res = await fetch('http://localhost:3000/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead)
    });
    
    console.log('Response Status:', res.status);
    const text = await res.text();
    console.log('Response Body:', text);
  } catch (e) {
    console.error('Error:', e.message);
  }
}

testLead();
