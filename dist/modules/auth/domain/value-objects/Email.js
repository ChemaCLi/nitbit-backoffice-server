"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
class Email {
    value;
    constructor(value) {
        this.value = value;
        this.value = value.trim().replaceAll(' ', '');
        if (!value) {
            throw new Error('Email is required');
        }
        if (!this.isValidEmail(value)) {
            throw new Error('Invalid email');
        }
    }
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    getValue() {
        return this.value;
    }
}
exports.Email = Email;
//# sourceMappingURL=Email.js.map