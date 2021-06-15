module.exports = {
  rootSchema: `
    type Product {
        id: ID!
        name: String!
        description: String!
        price: Float!
        offerPrice: Float!
        tags: [String!]
        category: String!
        cupon: String
        inventoryAmount: Int!
        quantity: Float!
        ingredients: [String!]
        nutritionalValues: Nutrition
    }
    input ProductInput {
        name: String!
        description: String!
        price: Float!
        offerPrice: Float!
        tags: [String!]
        category: String!
        cupon: String
        inventoryAmount: Int!
        quantity: Float!
        ingredients: [String!]
        nutritionalValues: NutritionInput
    }
    type Nutrition {
        energy: Float
        fat: Float
        saturatedFat: Float
        carbohydrates: Float
        protine: Float
        sugar: Float
        fiber: Float
        salt: Float
    }
   
    input NutritionInput {
        energy: Float
        fat: Float
        saturatedFat: Float
        carbohydrates: Float
        protine: Float
        sugar: Float
        fiber: Float
        salt: Float
    }
    input ProductUpdate {
        name: String
        description: String
        price: Float
        offerPrice: Float
        tags: [String]
        category: String
        cupon: String
        inventoryAmount: Int
        quantity: Float
        ingredients: [String]
        nutritionalValues: NutritionInput
    }
    `,
  query: `
        getProducts: [Product]
        getProductFromID(productId: String!): Product
    `,
  mutation: `
        addProduct(input:ProductInput): Product
        updateProduct(productId: String!,updates:ProductUpdate):Product
    `,
   
};
