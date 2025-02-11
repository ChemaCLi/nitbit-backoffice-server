"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllPlacesEndpoint = void 0;
const express_1 = __importDefault(require("express"));
const json_parsers_1 = require("../../application/json-parsers");
const findAllPlaces_1 = require("../../application/services/findAllPlaces");
const PrismaPlaceRepository_1 = require("../repositories/PrismaPlaceRepository");
const router = (0, express_1.default)();
router.get('/', async (req, res) => {
    try {
        const criteriaParams = req.params || {};
        const placeRepository = new PrismaPlaceRepository_1.PrismaPlaceRepository();
        const foundPlaces = await (0, findAllPlaces_1.findAllPlaces)(criteriaParams, placeRepository);
        res.json({
            message: 'Places found successfully',
            data: foundPlaces.map((place) => {
                return (0, json_parsers_1.placeToDTO)(place);
            }),
        });
    }
    catch (e) {
        console.error(e);
        res.statusCode = 500;
        res.json({ error: 'Error getting the place' });
    }
});
exports.findAllPlacesEndpoint = router;
//# sourceMappingURL=findAllPlaces.js.map