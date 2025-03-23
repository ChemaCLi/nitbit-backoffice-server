import { InvalidValueException } from '../../../shared/domain/exceptions/InvalidValueException'

export class Email {
  constructor(private readonly value: string) {
    this.value = value.trim().replaceAll(' ', '')

    if (!value) {
      throw new InvalidValueException('Email is required')
    }

    if (!this.isValidEmail(value)) {
      throw new InvalidValueException('Invalid email format')
    }
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  getValue(): string {
    return this.value
  }
}
