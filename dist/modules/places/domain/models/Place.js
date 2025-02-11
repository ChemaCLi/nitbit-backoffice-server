"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Place = void 0;
class Place {
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
    get countryName() {
        return this.props.countryName;
    }
    get stateName() {
        return this.props.stateName;
    }
    get cityName() {
        return this.props.cityName;
    }
    get geoJSON() {
        return this.props.geoJSON;
    }
    get shortName() {
        return this.props.shortName;
    }
    get description() {
        return this.props.description;
    }
    get shortDescription() {
        return this.props.shortDescription;
    }
    get tags() {
        return this.props.tags || [];
    }
    get typeTags() {
        return this.props.typeTags || [];
    }
    get footTraffic() {
        return this.props.footTraffic;
    }
    get pictures() {
        return this.props.pictures || [];
    }
    get relatedPlaces() {
        return this.props.relatedPlaces || [];
    }
}
exports.Place = Place;
//# sourceMappingURL=Place.js.map