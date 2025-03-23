import { InvalidValueException } from '../../../shared/domain/exceptions/InvalidValueException'

export class Phone {
  constructor(private readonly value: string) {
    this.value = value.trim().replaceAll(' ', '')

    if (!value) {
      throw new InvalidValueException('Phone is required')
    }

    if (!this.isValidPhone(value)) {
      throw new InvalidValueException('Invalid phone format')
    }
  }

  private isValidPhone(phone: string): boolean {
    return /^\+[0-9]{1,3}-[0-9]{1,14}$/.test(phone)
  }

  getValue(): string {
    return this.value
  }
}
