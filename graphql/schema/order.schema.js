module.exports = {
    rootScheme: `
        type Order {
            id: ID!
            cart: Cart!
            address: Address!
            user: User!
            createdAt: String!
            status: String!
            shipping: String
        }

        input OrderInput {
            cart: String!
            address: String!
        }
    `,
    Query: `
        getOrder(id: String!): Order!
        getUserOrders: [Order]
    `,
    Mutation: `
        createOrder(input: OrderInput): Order!
    `
}