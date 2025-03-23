export class NotificationException extends Error {
  constructor(
    description: string,
    public readonly recipient: {
      email?: string
      phone?: string
    },
    public readonly content: string,
    public readonly userId: string,
  ) {
    super(description)
    this.name = 'NotificationException'
  }
}
