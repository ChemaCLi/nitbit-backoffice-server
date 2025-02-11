"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dtoToPlace = exports.placeToDTO = exports.dtoToPicture = exports.pictureToDTO = exports.dtoToTag = exports.tagToDTO = void 0;
const Tag_1 = require("../../domain/models/Tag");
const Place_1 = require("../../domain/models/Place");
const Picture_1 = require("../../domain/models/Picture");
const ID_1 = require("../../../shared/domain/value-objects/ID");
const FootTraffic_1 = require("../../domain/value-objects/FootTraffic");
const PictureSize_1 = require("../../domain/value-objects/PictureSize");
const GeoJSON_1 = require("../../../shared/domain/value-objects/GeoJSON/GeoJSON");
const tagToDTO = (tag) => ({
    id: tag.id.toString(),
    name: tag.name,
    icon: tag.icon,
    description: tag.description,
});
exports.tagToDTO = tagToDTO;
const dtoToTag = (dto) => {
    return new Tag_1.Tag({
        ...dto,
        id: new ID_1.ID(dto.id),
    });
};
exports.dtoToTag = dtoToTag;
const pictureToDTO = (picture) => ({
    id: picture.id.toString(),
    imageUrl: picture.imageUrl,
    altText: picture.altText,
    figcaptionText: picture.figcaptionText,
    size: picture.size.getValue(),
    variants: picture.variants.map(exports.pictureToDTO),
});
exports.pictureToDTO = pictureToDTO;
const dtoToPicture = (dto) => {
    return new Picture_1.Picture({
        ...dto,
        id: new ID_1.ID(dto.id),
        size: new PictureSize_1.PictureSize(dto.size),
        variants: (dto.variants || []).map(exports.dtoToPicture),
    });
};
exports.dtoToPicture = dtoToPicture;
const placeToDTO = (place) => {
    return {
        id: place.id.toString(),
        name: place.name,
        countryName: place.countryName,
        cityName: place.cityName,
        stateName: place.stateName,
        geoJSON: place.geoJSON.getValue(),
        shortName: place.shortName,
        description: place.description,
        shortDescription: place.shortDescription,
        tags: place.tags.map(exports.tagToDTO),
        typeTags: place.typeTags.map(exports.tagToDTO),
        footTraffic: place.footTraffic?.getValue(),
        pictures: place.pictures.map(exports.pictureToDTO),
        relatedPlaces: place.relatedPlaces.map(exports.placeToDTO),
    };
};
exports.placeToDTO = placeToDTO;
const dtoToPlace = (dto) => {
    return new Place_1.Place({
        ...dto,
        id: new ID_1.ID(dto.id),
        geoJSON: new GeoJSON_1.GeoJSON(dto.geoJSON),
        tags: dto.tags?.map(exports.dtoToTag),
        typeTags: dto.typeTags?.map(exports.dtoToTag),
        pictures: dto.pictures?.map(exports.dtoToPicture),
        footTraffic: dto.footTraffic ? new FootTraffic_1.FootTraffic(dto.footTraffic) : undefined,
        relatedPlaces: dto.relatedPlaces?.map(exports.dtoToPlace),
    });
};
exports.dtoToPlace = dtoToPlace;
//# sourceMappingURL=index.js.map