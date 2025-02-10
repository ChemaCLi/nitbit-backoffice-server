import { RandomCodeGenerator } from '../../application/collaborators/verification-code-generator'

export class EasyCodeGenerator implements RandomCodeGenerator {
  async generate(): Promise<string> {
    return this.generateMemorableCode()
  }

  private generateMemorableCode(): string {
    const patterns = [
      () => this.repeatedDigits(),
      () => this.mirroredPattern(),
      () => this.sequencedPattern(),
    ]

    const pattern = patterns[Math.floor(Math.random() * patterns.length)]
    return pattern()
  }

  private repeatedDigits(): string {
    const first = this.getRandomDigit()
    const second = this.getRandomDigit()
    const third = this.getRandomDigit()
    return `${first}${first}${second}${second}${third}${third}`
  }

  private mirroredPattern(): string {
    const first = this.getRandomDigit()
    const second = this.getRandomDigit()
    const third = this.getRandomDigit()
    return `${first}${second}${third}${third}${second}${first}`
  }

  private sequencedPattern(): string {
    const start = Math.floor(Math.random() * 4) + 1 // Start between 1 and 4
    return `${start}${start + 1}${start + 2}${start + 3}${start + 4}${
      start + 5
    }`
  }

  private getRandomDigit(): number {
    return Math.floor(Math.random() * 10)
  }
}
