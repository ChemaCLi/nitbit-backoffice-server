import { v4 as uuidv4, validate as uuidValidate } from 'uuid'

export class ID {
  private value: string

  constructor(id?: string) {
    // If no ID is provided, generate a new UUID v4
    this.value = id ? this.validate(id) : uuidv4()
  }

  // Validate that the provided ID is a valid UUID v4
  private validate(id: string): string {
    if (!uuidValidate(id)) {
      throw new Error('Invalid UUID v4')
    }
    return id
  }

  // Get the string representation of the ID
  toString(): string {
    return this.value
  }

  // Compare two IDs for equality
  equals(other: ID): boolean {
    return this.value === other.toString()
  }
}
