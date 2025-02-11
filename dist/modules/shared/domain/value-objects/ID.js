"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ID = void 0;
const uuid_1 = require("uuid");
class ID {
    value;
    constructor(id) {
        // If no ID is provided, generate a new UUID v4
        this.value = id ? this.validate(id) : (0, uuid_1.v4)();
    }
    // Validate that the provided ID is a valid UUID v4
    validate(id) {
        if (!(0, uuid_1.validate)(id)) {
            throw new Error('Invalid UUID v4');
        }
        return id;
    }
    // Get the string representation of the ID
    toString() {
        return this.value;
    }
    // Compare two IDs for equality
    equals(other) {
        return this.value === other.toString();
    }
}
exports.ID = ID;
//# sourceMappingURL=ID.js.map