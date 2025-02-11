"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EasyCodeGenerator = void 0;
class EasyCodeGenerator {
    async generate() {
        return this.generateMemorableCode();
    }
    generateMemorableCode() {
        const patterns = [
            () => this.repeatedDigits(),
            () => this.mirroredPattern(),
            () => this.sequencedPattern(),
        ];
        const pattern = patterns[Math.floor(Math.random() * patterns.length)];
        return pattern();
    }
    repeatedDigits() {
        const first = this.getRandomDigit();
        const second = this.getRandomDigit();
        const third = this.getRandomDigit();
        return `${first}${first}${second}${second}${third}${third}`;
    }
    mirroredPattern() {
        const first = this.getRandomDigit();
        const second = this.getRandomDigit();
        const third = this.getRandomDigit();
        return `${first}${second}${third}${third}${second}${first}`;
    }
    sequencedPattern() {
        const start = Math.floor(Math.random() * 4) + 1; // Start between 1 and 4
        return `${start}${start + 1}${start + 2}${start + 3}${start + 4}${start + 5}`;
    }
    getRandomDigit() {
        return Math.floor(Math.random() * 10);
    }
}
exports.EasyCodeGenerator = EasyCodeGenerator;
//# sourceMappingURL=random-code-generator.js.map