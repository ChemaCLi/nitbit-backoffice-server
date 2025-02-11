"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllPlaces = void 0;
const findAllPlaces = async (criteria, placeRepository) => {
    const places = await placeRepository.findAll();
    return places;
};
exports.findAllPlaces = findAllPlaces;
//# sourceMappingURL=findAllPlaces.js.map