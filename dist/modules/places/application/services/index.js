"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlacesUseCases = void 0;
const findAllPlaces_1 = require("./findAllPlaces");
const registerPlace_1 = require("./registerPlace");
const findPlacesByState_1 = require("./findPlacesByState");
exports.PlacesUseCases = {
    registerPlace: registerPlace_1.registerPlace,
    findAllPlaces: findAllPlaces_1.findAllPlaces,
    findPlacesByState: findPlacesByState_1.findPlacesByState,
};
//# sourceMappingURL=index.js.map