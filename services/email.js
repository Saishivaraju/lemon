const { Resend } = require('resend');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const resend = new Resend(process.env.RESEND_API_KEY);
/**
 * Email Service
 * Fully integrated with Resend API
 * Using verified custom domain: saiwebservices.in
 */
const sendEmail = async ({ to, subject, message, html }) => {
  if (!process.env.RESEND_API_KEY) {
    console.error('❌ RESEND_API_KEY is missing in environment variables!');
    return { success: false, error: 'Email service is missing: RESEND_API_KEY not configured' };
  }
  try {
    const recipient = to;
    const agentEmail = process.env.AGENT_EMAIL || 'saishivaraju.m2002@gmail.com';

    // Use Resend's verified sandbox sender — avoids 403 domain errors
    // Replace with your verified domain sender once you verify a domain in Resend
    const fromAddress = process.env.RESEND_FROM_EMAIL || 'PropEdge <onboarding@resend.dev>';

    const payload = {
      from: fromAddress,
      to: [recipient],
      reply_to: agentEmail,  // Replies go to the actual agent
      subject: subject,
      text: message,
    };

    // Include HTML if provided
    if (html) payload.html = html;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    const data = await response.json();

    if (!response.ok) {
      console.error('📧 Resend Error:', JSON.stringify(data));
      return { success: false, error: data };
    }

    console.log(`📧 Email sent to ${recipient} | Subject: ${subject} | ID: ${data.id}`);
    return { success: true, data };
  } catch (err) {
    console.error('📧 Email Service Exception:', err.message);
    return { success: false, error: err.message };
  }
};

module.exports = { sendEmail };

