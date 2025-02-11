"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Phone = void 0;
class Phone {
    value;
    constructor(value) {
        this.value = value;
        this.value = value.trim().replaceAll(' ', '');
        if (!value) {
            throw new Error('Phone is required');
        }
        if (!this.isValidPhone(value)) {
            throw new Error('Invalid phone');
        }
    }
    isValidPhone(phone) {
        return /^\+[0-9]{1,3}-[0-9]{1,14}$/.test(phone);
    }
    getValue() {
        return this.value;
    }
}
exports.Phone = Phone;
//# sourceMappingURL=Phone.js.map