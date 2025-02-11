"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerPlace = void 0;
const registerPlace = async (place, placeRepository) => {
    return placeRepository.save(place);
};
exports.registerPlace = registerPlace;
//# sourceMappingURL=registerPlace.js.map