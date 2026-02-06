// Any setup scripts you might need go here

// Load .env files
import 'dotenv/config'

if (!process.env.PAYLOAD_SECRET) {
  process.env.PAYLOAD_SECRET = 'test-secret'
}
