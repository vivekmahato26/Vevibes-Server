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
            payment: Payment!
            paymentStatus: Boolean!
        }

        type Payment {
            created: String!
            last4: Int!
            currency: String!
            addressState: String!
            funding: String!
            addressLine1: String!
            name: String!
            number: String
            brand: String!
            addressZip: String!
            addressLine2: String
            country: String!
            expYear: Int!
            addressCountry: String!
            cardId: String!
            expMonth: Int!
            addressCity: String!
            tokenId: String!
            paymentStatus: Boolean!
        }

        input OrderInput {
            paymentStatus: Boolean!
            cart: String!
            address: String!
            payment: PaymentInput
        }

        input PaymentInput {
            created: String!
            last4: Int!
            currency: String!
            addressState: String!
            funding: String!
            addressLine1: String!
            name: String!
            number: String
            cvc: String
            brand: String!
            addressZip: String!
            addressLine2: String
            country: String!
            expYear: Int!
            addressCountry: String!
            cardId: String!
            expMonth: Int!
            addressCity: String!
            tokenId: String!
            cart: String!
        }
    `,
    Query: `
        getOrder(id: String!): Order!
        getUserOrders: [Order]
    `,
    Mutation: `
        createOrder(input: OrderInput): Order!
        createPayment(input: PaymentInput): Payment!
    `
}