import	 { buildSchema } from 'graphql';

const productSchema = buildSchema(`
input ProductInput {
    title: String,
    price: Float,
    thumbnail: String
}
type Product {
    id: ID!
    title: String,
    price: Float,
    thumbnail: String
}
type Query {
    getProduct(id: ID!): Product,
    getProducts: [Product],
}
type Mutation {
    createProduct(datos: ProductInput): Product,
    updateProduct(id: ID!, datos: ProductInput): Product,
    deleteProduct(id: ID!): Product,
}
`)

export default productSchema