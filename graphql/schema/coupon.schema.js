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
            discount: String!
            percent: String!
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
            discount: String!
            percent: String!
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
