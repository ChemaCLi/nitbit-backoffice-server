"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Zone = void 0;
class Zone {
    props;
    constructor(props) {
        this.props = props;
    }
    get id() {
        return this.props.id;
    }
    get name() {
        return this.props.name;
    }
    get places() {
        return this.props.places || [];
    }
}
exports.Zone = Zone;
//# sourceMappingURL=Zone.js.map