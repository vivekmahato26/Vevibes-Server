module.exports = {
    rootSchema: `
    type Cart {
        id: ID!
        items: [CartItem]
        total: Float
        coupon: String
        discount: Float
        tax: Float
        deliveryPrice: Float
        grandTotal: Float
        user: User!
    }
    type CartItem {
        itemId: Product
        quantity: Int!
    }
    input CartItemInput {
        itemId: String
        quantity: Int
    }
    input CartInput {
        items: [CartItemInput]
        total: Float
        coupon: String
        discount: Float
        tax: Float
        deliveryPrice: Float
        grandTotal: Float
    }
    `,
    Query: `
    getCart(id:String!): CartResult
    getUserCart: CartResult
    `,
    Mutation: `
    addToCart(item: CartItemInput!): CartResult
    removeFromCart(item: CartItemInput!, id: String!): CartResult
    `
};
