import { type SchemaTypeDefinition } from 'sanity'
import productsDataSchema from './productsDataSchema'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productsDataSchema],
}
