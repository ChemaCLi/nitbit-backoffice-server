export abstract class VerificationCodeGenerator {
  abstract generate(): Promise<string>
}
