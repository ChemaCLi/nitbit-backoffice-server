"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerPlaceEndpoint = void 0;
const express_1 = __importDefault(require("express"));
const ID_1 = require("../../../shared/domain/value-objects/ID");
const json_parsers_1 = require("../../application/json-parsers");
const registerPlace_1 = require("../../application/services/registerPlace");
const PrismaPlaceRepository_1 = require("../repositories/PrismaPlaceRepository");
const validateCreatePlaceInput_1 = require("../validators/validateCreatePlaceInput");
const router = (0, express_1.default)();
router.post('/', async (req, res) => {
    try {
        const body = req.body || {};
        await (0, validateCreatePlaceInput_1.validateCreatePlaceInput)(body);
        const placeRepository = new PrismaPlaceRepository_1.PrismaPlaceRepository();
        const place = (0, json_parsers_1.dtoToPlace)({
            ...body,
            name: body.name,
            geoJSON: body.geoJSON,
            id: new ID_1.ID().toString(),
        });
        const createdPlace = await (0, registerPlace_1.registerPlace)(place, placeRepository);
        const createdPlaceAsDTO = (0, json_parsers_1.placeToDTO)(createdPlace);
        res.statusCode = 201;
        res.json({
            message: 'The place has been created successfully',
            data: createdPlaceAsDTO,
        });
    }
    catch (e) {
        console.error(e);
        const validationErrors = (e.errors || []).join('. ');
        const message = e.errors?.length > 0 ? validationErrors : e.message;
        res.statusCode = 500;
        if (validationErrors) {
            res.statusCode = 400;
        }
        res.json({ error: 'Error creating the place', message });
    }
});
exports.registerPlaceEndpoint = router;
//# sourceMappingURL=registerPlace.js.map