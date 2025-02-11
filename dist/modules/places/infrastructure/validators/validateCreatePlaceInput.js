"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreatePlaceInput = void 0;
const yup = __importStar(require("yup"));
const coordinatePairSchema = yup.array().of(yup.number()).length(2);
const geometrySchema = yup.object({
    type: yup.mixed().oneOf(['Point', 'LineString', 'Polygon']).required(),
    coordinates: yup.lazy((value) => {
        if (Array.isArray(value)) {
            if (Array.isArray(value[0])) {
                if (Array.isArray(value[0][0])) {
                    return yup.array().of(yup.array().of(coordinatePairSchema));
                }
                return yup.array().of(coordinatePairSchema);
            }
            return coordinatePairSchema;
        }
        return yup.mixed().notRequired();
    }),
});
const geoJsonSchema = yup.object({
    type: yup.mixed().oneOf(['Feature']).required(),
    properties: yup.object().shape({}).required(),
    geometry: geometrySchema.required(),
});
const tagSchema = yup.object({
    id: yup.string().optional(),
    name: yup.string().required(),
    icon: yup.string().optional(),
    description: yup.string().optional(),
});
const pictureSchema = yup.object({
    id: yup.string().optional(),
    imageUrl: yup.string().url().required(),
    altText: yup.string().required(),
    figcaptionText: yup.string().required(),
    size: yup.string().required(),
    variants: yup.array().of(yup.lazy(() => pictureSchema.omit(['variants']))),
});
const placeSchema = yup.object({
    id: yup.string().optional(),
    name: yup.string().required(),
    countryName: yup.string().optional(),
    stateName: yup.string().optional(),
    cityName: yup.string().optional(),
    geoJSON: geoJsonSchema.required(),
    shortName: yup.string().optional(),
    description: yup.string().optional(),
    shortDescription: yup.string().optional(),
    tags: yup.array().of(tagSchema).optional(),
    typeTags: yup.array().of(tagSchema).optional(),
    footTraffic: yup.mixed().oneOf(['LOW', 'MEDIUM', 'HIGH']).optional(),
    pictures: yup.array().of(pictureSchema).optional(),
    relatedPlaces: yup
        .array()
        .of(yup.lazy(() => placeSchema))
        .optional(),
});
const validateCreatePlaceInput = async (input) => {
    await placeSchema.validate(input, { abortEarly: false });
};
exports.validateCreatePlaceInput = validateCreatePlaceInput;
//# sourceMappingURL=validateCreatePlaceInput.js.map