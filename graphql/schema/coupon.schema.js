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
        }
    `,
    Query: `
        getCoupons: [Coupon]
        getUserCoupons: [Coupon]
    `,
    Mutation: `
        addCoupon(input: CouponInput) : Coupon 
        modifyCoupon(id: String!,active: Boolean): Coupon 
    `
}
