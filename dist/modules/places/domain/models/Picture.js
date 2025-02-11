"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Picture = void 0;
class Picture {
    props;
    constructor(props) {
        this.props = props;
    }
    get id() {
        return this.props.id;
    }
    get imageUrl() {
        return this.props.imageUrl;
    }
    get altText() {
        return this.props.altText;
    }
    get figcaptionText() {
        return this.props.figcaptionText;
    }
    get size() {
        return this.props.size;
    }
    get variants() {
        return this.props.variants;
    }
}
exports.Picture = Picture;
//# sourceMappingURL=Picture.js.map