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
        ingredients: String!
        nutritionalValues: [Nutrition]
        allergen: String
        disclaimer: String
        featured: Boolean!
        category: String!
        subCategory: [String]
        createdAt: String!
        featuredImg: String
        brand: String
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
        ingredients: String!
        nutritionalValues: [NutritionInput]
        allergen: String
        disclaimer: String
        featured: Boolean!
        category: String!
        subCategory: [String]
        createdAt: String!
        featuredImg: String
        brand: String
    }
    type Nutrition {
        name: String!
        percentage: Float
        value: String!
    }
   
    input NutritionInput {
      name: String!
      percentage: Float
      value: String!
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
        ingredients: String
        nutritionalValues: [NutritionInput]
        allergen: String
        disclaimer: String
        featured: Boolean
        featuredImg: String
        brand: String
    }
    type Products {
      res: [Product]
    }
    type Error {
        message: String!
      }
    type Sucess {
        res: Boolean!
    }
    `,
  query: `
        getProducts: ProductsResult
        getProductFromID(productId: String!): Product
        getFeaturedProducts: ProductsResult
        checkWishlisted(productId: String!): BooleanResult!
    `,
  mutation: `
        addProduct(input:ProductInput): ProductResult
        updateProduct(productId: String!,updates:ProductUpdate):ProductResult
        checkout(amount: Float!,currency: String!,description: String!,paymentMethod: [String!]) : String!
    `,
   
};
