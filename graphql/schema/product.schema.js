module.exports = {
  rootSchema: `
    type Product {
        id: ID!
        name: String!
        description: String!
        price: Float!
        offerPrice: Float
        img: [String]
        tags: [String!]
        category: [String!]
        cupon: String
        stock: Int!
        weightKG: Float
        ingredients: [String!]
        nutritionalValues: Nutrition
        allergen: String
        disclaimer: String
        featured: Boolean!
        availabe: Boolean!
    }
    input ProductInput {
        name: String!
        description: String!
        price: Float!
        offerPrice: Float!
        img: [String]
        tags: [String!]
        category: [String!]
        cupon: String
        stock: Int!
        weightKG: Float!
        ingredients: [String!]
        nutritionalValues: NutritionInput
        allergen: String
        disclaimer: String
        featured: Boolean!
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
        category: [String]
        cupon: String
        stock: Int
        weightKG: Float
        ingredients: [String]
        nutritionalValues: NutritionInput
        allergen: String
        disclaimer: String
        featured: Boolean
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
