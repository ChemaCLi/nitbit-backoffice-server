import * as yup from 'yup'

const coordinatePairSchema = yup.array().of(yup.number()).length(2)

const geometrySchema = yup.object({
  type: yup.mixed().oneOf(['Point', 'LineString', 'Polygon']).required(),
  coordinates: yup.lazy((value) => {
    if (Array.isArray(value)) {
      if (Array.isArray(value[0])) {
        if (Array.isArray(value[0][0])) {
          return yup.array().of(yup.array().of(coordinatePairSchema))
        }
        return yup.array().of(coordinatePairSchema)
      }
      return coordinatePairSchema
    }
    return yup.mixed().notRequired()
  }),
})

const geoJsonSchema = yup.object({
  type: yup.mixed().oneOf(['Feature']).required(),
  properties: yup.object().shape({}).required(),
  geometry: geometrySchema.required(),
})

const tagSchema = yup.object({
  id: yup.string().optional(),
  name: yup.string().required(),
  icon: yup.string().optional(),
  description: yup.string().optional(),
})

const pictureSchema: any = yup.object({
  id: yup.string().optional(),
  imageUrl: yup.string().url().required(),
  altText: yup.string().required(),
  figcaptionText: yup.string().required(),
  size: yup.string().required(),
  variants: yup.array().of(yup.lazy(() => pictureSchema.omit(['variants']))),
})

const placeSchema: any = yup.object({
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
})

export const validateCreatePlaceInput = async (input: any) => {
  await placeSchema.validate(input, { abortEarly: false })
}
