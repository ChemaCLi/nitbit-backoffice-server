"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FootTraffic = void 0;
class FootTraffic {
    value;
    constructor(value) {
        this.value = value;
        if (!['LOW', 'MEDIUM', 'HIGH'].includes(value)) {
            throw new Error('Invalid foot traffic level');
        }
    }
    getValue() {
        return this.value;
    }
}
exports.FootTraffic = FootTraffic;
//# sourceMappingURL=FootTraffic.js.map