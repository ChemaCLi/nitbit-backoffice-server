export abstract class Notifier {
  abstract notify(message: string): Promise<void>
}
