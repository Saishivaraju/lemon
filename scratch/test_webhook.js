const http = require('http');

const data = JSON.stringify({
  message: {
    type: 'end-of-call-report',
    endedReason: 'customer-did-not-answer',
    durationSeconds: 5,
    call: {
      id: 'test_call_id',
      customer: { number: '+919999900000', name: 'Test Lead' },
      metadata: { leadId: 'test_lead_id', email: 'test@example.com' }
    }
  }
});

const opts = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/vapi/webhook',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(opts, res => {
  let raw = '';
  res.on('data', c => raw += c);
  res.on('end', () => console.log('Response:', raw));
});

req.on('error', e => console.error(e));
req.write(data);
req.end();
