export abstract class RandomCodeGenerator {
  abstract generate(): Promise<string>
}
