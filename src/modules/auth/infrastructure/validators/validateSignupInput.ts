import * as yup from 'yup'

const signupSchema = yup.object({
  fullName: yup
    .string()
    .min(3, 'Full name must be at least 3 characters long')
    .max(50, 'Full name cannot exceed 50 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Full name can only contain letters and spaces')
    .required('Full name is required'),

  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),

  phone: yup
    .string()
    .matches(/^\+?[0-9]{10,15}$/, 'Invalid phone number format')
    .required('Phone number is required'),

  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(100, 'Password cannot exceed 100 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[\W_]/, 'Password must contain at least one special character')
    .required('Password is required'),
})

export const validateSignupInput = async (input: any) => {
  await signupSchema.validate(input, { abortEarly: false })
}
