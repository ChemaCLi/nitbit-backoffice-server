interface UpdateUserInput {
  fullName?: string
  email?: string
  phone?: string
  onlineStatus?: 'online' | 'offline'
}

export const validateUpdateUserInput = async (
  input: UpdateUserInput,
): Promise<void> => {
  const errors: string[] = []

  if (input.fullName && input.fullName.length < 3) {
    errors.push('Full name must be at least 3 characters long')
  }

  if (input.email && !input.email.includes('@')) {
    errors.push('Invalid email format')
  }

  if (input.phone && !/^\+?[1-9]\d{1,14}$/.test(input.phone)) {
    errors.push('Invalid phone format')
  }

  if (
    input.onlineStatus &&
    !['online', 'offline'].includes(input.onlineStatus)
  ) {
    errors.push('Invalid online status')
  }

  if (errors.length > 0) {
    throw new Error(errors.join('. '))
  }
}
