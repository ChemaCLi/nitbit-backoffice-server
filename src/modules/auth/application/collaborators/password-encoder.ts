export abstract class PasswordEncoder {
  abstract encode(password: string): Promise<string>
  abstract compare(password: string, hashedPassword: string): Promise<boolean>
}
