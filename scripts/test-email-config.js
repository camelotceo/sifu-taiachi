// Test script to verify email configuration
// Run with: node scripts/test-email-config.js

const { Resend } = require('resend')

console.log('🧪 Testing Email Configuration...\n')

// Check environment variables
const apiKey = process.env.RESEND_API_KEY
console.log('🔑 Environment Check:')
console.log('  - RESEND_API_KEY present:', apiKey ? '✅ Yes' : '❌ No')
console.log('  - API Key length:', apiKey ? apiKey.length : 0)
console.log('  - API Key prefix:', apiKey ? apiKey.substring(0, 10) + '...' : 'N/A')

if (!apiKey) {
  console.log('\n❌ RESEND_API_KEY is not set!')
  console.log('Please create a .env.local file with:')
  console.log('RESEND_API_KEY=re_7GYGWXdm_BhSNgkGwRyTCoLstosheFq8X')
  process.exit(1)
}

// Test Resend initialization
try {
  const resend = new Resend(apiKey)
  console.log('\n✅ Resend client initialized successfully')
  
  // Test API key validity (this will make a real API call)
  console.log('\n🧪 Testing API key validity...')
  
  resend.emails.send({
    from: 'test@taichiwithdrbeauvais.com',
    to: ['info@taichiwithdrbeauvais.com'],
    subject: 'Test Email Configuration',
    html: '<p>This is a test email to verify the configuration.</p>',
  }).then(({ data, error }) => {
    if (error) {
      console.log('❌ API Key test failed:', error)
    } else {
      console.log('✅ API Key test successful!')
      console.log('  - Email ID:', data?.id)
    }
  }).catch((err) => {
    console.log('❌ API Key test error:', err.message)
  })
  
} catch (error) {
  console.log('❌ Failed to initialize Resend:', error.message)
}
