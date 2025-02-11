"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PictureSize = void 0;
class PictureSize {
    value;
    constructor(value) {
        this.value = value;
        if (!['TINY', 'SMALL', 'MEDIUM', 'LARGE', 'EXTRA_LARGE'].includes(value)) {
            throw new Error('Invalid picture size');
        }
    }
    getValue() {
        return this.value;
    }
}
exports.PictureSize = PictureSize;
//# sourceMappingURL=PictureSize.js.map