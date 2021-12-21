module.exports = {
  rootSchema: `
    type Product {
        id: ID!
        name: String!
        description: Description!
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
        chilled: Boolean!
    }
    type Description {
      desc: String!
      subDesc: [String]
    }
    input DescriptionInput {
      desc: String!
      subDesc: [String]
    }
    input ProductInput {
        name: String!
        description: DescriptionInput!
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
        chilled: Boolean!
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
        description: DescriptionInput
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
        chilled: Boolean!
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
        getFilteredProducts(filter: String!,type: String!): ProductsResult
    `,
  mutation: `
        addProduct(input:ProductInput): Product
        updateProduct(productId: String!,updates:ProductUpdate):Product
        checkout(amount: Float!,currency: String!,description: String!,paymentMethod: [String!]) : String!
    `,
   
};
