"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPlacesByStateEndpoint = void 0;
const express_1 = __importDefault(require("express"));
const json_parsers_1 = require("../../application/json-parsers");
const PrismaPlaceRepository_1 = require("../repositories/PrismaPlaceRepository");
const findPlacesByState_1 = require("../../application/services/findPlacesByState");
const router = (0, express_1.default)();
router.get('/states/:state', async (req, res) => {
    try {
        const { state } = req.params;
        if (typeof state !== 'string') {
            throw new Error('Invalid request body');
        }
        const placeRepository = new PrismaPlaceRepository_1.PrismaPlaceRepository();
        const foundPlaces = await (0, findPlacesByState_1.findPlacesByState)(state, placeRepository);
        const message = foundPlaces.length > 0
            ? 'Places found successfully'
            : `There are no places for the state ${state}`;
        res.json({
            message,
            data: foundPlaces.map((place) => (0, json_parsers_1.placeToDTO)(place)),
        });
    }
    catch (e) {
        console.error(e);
        res.statusCode = 500;
        res.json({ error: 'Error getting the places' });
    }
});
exports.findPlacesByStateEndpoint = router;
//# sourceMappingURL=findPlacesByState.js.map