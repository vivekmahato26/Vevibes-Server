module.exports = {
    rootQuery: `
        type Coupon {
            id: ID!
            code: String!
            expiration: String!
            title: String!
            description: String!
            singleUse: Boolean!
        }
    `
}