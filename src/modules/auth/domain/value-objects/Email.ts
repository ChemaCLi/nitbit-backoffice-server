export class Email {
  constructor(private readonly value: string) {
    // Remove white spaces
    this.value = value.trim().replaceAll(' ', '')

    if (!value) {
      throw new Error('Email is required')
    }

    if (!this.isValidEmail(value)) {
      throw new Error('Invalid email')
    }
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  getValue(): string {
    return this.value
  }
}
