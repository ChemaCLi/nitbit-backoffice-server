"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = void 0;
class Tag {
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
    get icon() {
        return this.props.icon;
    }
    get description() {
        return this.props.description;
    }
}
exports.Tag = Tag;
//# sourceMappingURL=Tag.js.map