const { REST_API_PORT = 3000, RESEND_API_KEY = '' } = process.env

export const config = Object.freeze({
  app: { REST_API_PORT },
  mailing: {
    RESEND_API_KEY,
    SYSTEM_EMAIL: 'onboarding@resend.dev',
  },
})
