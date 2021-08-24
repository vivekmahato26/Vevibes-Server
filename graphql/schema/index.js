const {gql} = require("apollo-server-express");

const UserSchema = require("./user.schema");
const ProductSchema = require("./product.schema");
const OrderSchema = require("./order.schema");
const ErrorSchema = require("./error.schema");
const CouponSchema = require("./coupon.schema");

module.exports =  gql`

    ${UserSchema.rootSchema}
    ${ProductSchema.rootSchema}
    ${OrderSchema.rootScheme}
    ${ErrorSchema.rootSchema}
    ${CouponSchema.rootSchema}

    type Query {
        ${UserSchema.query}
        ${ProductSchema.query}
        ${OrderSchema.Query}
        ${CouponSchema.Query}
    }

    type Mutation {
        ${UserSchema.mutation}
        ${ProductSchema.mutation}
        ${OrderSchema.Mutation}
        ${CouponSchema.Mutation}
    }
`;