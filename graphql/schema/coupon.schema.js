module.exports = {
    rootSchema: `
        type Coupon {
            id: ID!
            code: String!
            expiration: String!
            title: String!
            description: String!
            singleUse: Boolean!
            user: User
            createdAt: String!
            active: Boolean!
            discount: Float!
            percent: Float
            minCart: Float
        }

        input CouponInput {
            code: String!
            expiration: String!
            title: String!
            description: String!
            singleUse: Boolean!
            user: String
            createdAt: String!
            active: Boolean!
            discount: Float!
            percent: Float
            minCart: Float
        }
    `,
    Query: `
        getCoupons: [Coupon]
        getUserCoupons: [Coupon]
        checkCoupon(code: String!): [Coupon]
    `,
    Mutation: `
        addCoupon(input: CouponInput) : Coupon 
        modifyCoupon(id: String!,active: Boolean): Coupon 
    `
}
