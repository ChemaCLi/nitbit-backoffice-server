"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaPlaceRepository = void 0;
const client_1 = require("@prisma/client");
const json_parsers_1 = require("../../application/json-parsers");
const prisma = new client_1.PrismaClient();
class PrismaPlaceRepository {
    async save(place) {
        const placeAsDTO = (0, json_parsers_1.placeToDTO)(place);
        const picturesWithoutVariants = (placeAsDTO.pictures?.length ? placeAsDTO.pictures : [])
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .map(({ variants, ...pic }) => ({
            ...pic,
        }));
        const rawPlace = await prisma.place.create({
            include: {
                pictures: true,
            },
            data: {
                ...placeAsDTO,
                geoJSON: JSON.parse(JSON.stringify(placeAsDTO.geoJSON)),
                tags: {
                    create: placeAsDTO.tags?.length ? placeAsDTO.tags : [],
                },
                typeTags: {
                    create: placeAsDTO.typeTags?.length ? placeAsDTO.typeTags : [],
                },
                pictures: {
                    create: picturesWithoutVariants,
                },
                relatedPlaces: undefined,
            },
        });
        const geoJsonAsString = typeof rawPlace.geoJSON === 'object'
            ? JSON.stringify(rawPlace.geoJSON)
            : rawPlace.geoJSON;
        const prismaGeoJSON = JSON.parse(geoJsonAsString);
        return (0, json_parsers_1.dtoToPlace)({
            ...rawPlace,
            countryName: rawPlace.countryName || undefined,
            stateName: rawPlace.stateName || undefined,
            cityName: rawPlace.cityName || undefined,
            relatedPlaces: [],
            tags: [],
            typeTags: [],
            geoJSON: prismaGeoJSON || undefined,
            shortName: rawPlace.shortName || undefined,
            name: rawPlace.name,
            description: rawPlace.description || undefined,
            shortDescription: rawPlace.shortDescription || undefined,
            footTraffic: rawPlace.footTraffic || undefined,
            pictures: rawPlace.pictures.map((rawPic) => ({
                ...rawPic,
                variants: [],
                size: rawPic.size,
            })),
        });
    }
    async findAll() {
        const rawPlaces = await prisma.place.findMany({
            include: {
                pictures: true,
            },
        });
        return rawPlaces.map((rawPlace) => {
            const geoJsonAsString = typeof rawPlace.geoJSON === 'object'
                ? JSON.stringify(rawPlace.geoJSON)
                : rawPlace.geoJSON;
            const prismaGeoJSON = JSON.parse(geoJsonAsString);
            return (0, json_parsers_1.dtoToPlace)({
                ...rawPlace,
                countryName: rawPlace.countryName || undefined,
                stateName: rawPlace.stateName || undefined,
                cityName: rawPlace.cityName || undefined,
                relatedPlaces: [],
                tags: [],
                typeTags: [],
                geoJSON: prismaGeoJSON || undefined,
                shortName: rawPlace.shortName || undefined,
                name: rawPlace.name,
                description: rawPlace.description || undefined,
                shortDescription: rawPlace.shortDescription || undefined,
                footTraffic: rawPlace.footTraffic || undefined,
                pictures: rawPlace.pictures.map((rawPic) => ({
                    ...rawPic,
                    variants: [],
                    size: rawPic.size,
                })),
            });
        });
    }
}
exports.PrismaPlaceRepository = PrismaPlaceRepository;
//# sourceMappingURL=PrismaPlaceRepository.js.map