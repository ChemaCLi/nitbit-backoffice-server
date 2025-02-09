export abstract class TokenGenerator {
  abstract generateToken<T>(payload: T): Promise<string>
}
