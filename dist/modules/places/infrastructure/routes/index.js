"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const registerPlace_1 = require("./registerPlace");
const findAllPlaces_1 = require("./findAllPlaces");
const findPlacesByState_1 = require("./findPlacesByState");
const router = (0, express_1.default)();
router.use(registerPlace_1.registerPlaceEndpoint);
router.use(findAllPlaces_1.findAllPlacesEndpoint);
router.use(findPlacesByState_1.findPlacesByStateEndpoint);
exports.default = router;
//# sourceMappingURL=index.js.map