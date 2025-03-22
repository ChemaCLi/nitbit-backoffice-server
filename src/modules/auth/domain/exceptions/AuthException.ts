export class AuthException extends Error {
  constructor(description: string) {
    super(description)
    this.name = 'AuthException'
  }
}
