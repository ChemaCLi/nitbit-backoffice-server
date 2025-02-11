"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoordinatePair = void 0;
class CoordinatePair {
    latitude;
    longitude;
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
        if (latitude < -90 ||
            latitude > 90 ||
            longitude < -180 ||
            longitude > 180) {
            throw new Error('Invalid coordinates');
        }
    }
    getLatitude() {
        return this.latitude;
    }
    getLongitude() {
        return this.longitude;
    }
    toArray() {
        return [this.latitude, this.longitude];
    }
}
exports.CoordinatePair = CoordinatePair;
//# sourceMappingURL=CoordinatePair.js.map