const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const { makeOutboundCall } = require('../services/vapi');

const lead = {
  name: 'Test Lead',
  phone: '+1 754 291 7462',
  email: 'saishivaraju.m2002@gmail.com',
  property_interest: 'Skyview Residences'
};

const properties = [
  { name: 'Skyview Residences', location: 'Downtown, Dubai', price: '$1,200,000' }
];

async function testCall() {
  console.log('🚀 Starting Vapi test call...');
  try {
    const result = await makeOutboundCall(lead, properties);
    console.log('✅ Vapi Result:', JSON.stringify(result, null, 2));
  } catch (err) {
    console.error('❌ Vapi Error:', err.message);
  }
}

testCall();
