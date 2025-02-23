"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPlacesByState = void 0;
const findPlacesByState = async (state, placeRepository) => {
    const places = await placeRepository.findByState(state);
    return places;
};
exports.findPlacesByState = findPlacesByState;
//# sourceMappingURL=findPlacesByState.js.map