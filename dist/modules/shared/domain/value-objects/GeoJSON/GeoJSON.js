"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeoJSON = void 0;
class GeoJSON {
    props;
    constructor(props) {
        this.props = props;
        if (props.type !== 'Feature') {
            throw new Error('Invalid GeoJSON type');
        }
    }
    getValue() {
        return {
            type: this.props.type,
            properties: this.props.properties,
            geometry: {
                type: this.props.geometry.type,
                coordinates: this.props.geometry.coordinates,
            },
        };
    }
}
exports.GeoJSON = GeoJSON;
//# sourceMappingURL=GeoJSON.js.map