const {
  REST_API_PORT = 3000,
  SYSTEM_EMAIL = 'noreply@noreply.com',
  RESEND_API_KEY = '',
  JWT_SECRET = 'default_secret',
} = process.env

export const config = Object.freeze({
  app: { REST_API_PORT },
  mailing: {
    RESEND_API_KEY,
    SYSTEM_EMAIL,
  },
  jwt: {
    JWT_SECRET,
  },
})
