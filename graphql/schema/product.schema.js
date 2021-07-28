module.exports = {
  rootSchema: `
    type Product {
        id: ID!
        name: String!
        description: String!
        price: Float!
        salePrice: Float
        img: [String]
        tags: [String!]
        coupon: String
        stock: Int
        weightKG: Float
        ingredients: [String!]
        nutritionalValues: Nutrition
        allergen: String
        disclaimer: String
        featured: Boolean!
        availabe: Boolean!
        category: String!
        subCategory: [String]
        createdAt: String!
    }
    input ProductInput {
        name: String!
        description: String!
        price: Float!
        salePrice: Float
        img: [String]
        tags: [String!]
        coupon: String
        stock: Int
        weightKG: Float!
        ingredients: [String!]
        nutritionalValues: NutritionInput
        allergen: String
        disclaimer: String
        featured: Boolean!
        category: String!
        subCategory: [String]
        createdAt: String!
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
        salePrice: Float
        tags: [String]
        category: [String]
        coupon: String
        stock: Int
        weightKG: Float
        ingredients: [String]
        nutritionalValues: NutritionInput
        allergen: String
        disclaimer: String
        featured: Boolean
    }
    type LoginError {
        message: String!
      }
    type Sucess {
        res: Boolean!
    }
      union WishlistedResult = Sucess | LoginError
    `,
  query: `
        getProducts: [Product]
        getProductFromID(productId: String!): Product
        getFeaturedProducts: [Product]
        checkWishlisted(productId: String!): WishlistedResult!
    `,
  mutation: `
        addProduct(input:ProductInput): Product
        updateProduct(productId: String!,updates:ProductUpdate):Product
        checkout(amount: Float!,currency: String!,description: String!,paymentMethod: [String!]) : String!
    `,
   
};
