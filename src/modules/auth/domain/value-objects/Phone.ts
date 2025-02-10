export class Phone {
  constructor(private readonly value: string) {
    this.value = value.trim().replaceAll(' ', '')

    if (!value) {
      throw new Error('Phone is required')
    }

    if (!this.isValidPhone(value)) {
      throw new Error('Invalid phone')
    }
  }

  private isValidPhone(phone: string): boolean {
    return /^\+[0-9]{1,3}-[0-9]{1,14}$/.test(phone)
  }

  getValue(): string {
    return this.value
  }
}
