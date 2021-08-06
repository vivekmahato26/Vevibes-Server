const {gql} = require("apollo-server-express");

const UserSchema = require("./user.schema");
const ProductSchema = require("./product.schema");
const CartSchema = require("./cart.schema");
const OrderSchema = require("./order.schema");
const ShippingSchema = require("./shipping.schema");
const ErrorSchema = require("./error.schema");

module.exports =  gql`

    ${UserSchema.rootSchema}
    ${ProductSchema.rootSchema}
    ${CartSchema.rootSchema}
    ${OrderSchema.rootScheme}
    ${ShippingSchema.rootSchema}
    ${ErrorSchema.rootSchema}

    type Query {
        ${UserSchema.query}
        ${ProductSchema.query}
        ${CartSchema.Query}
        ${OrderSchema.Query}
        ${ShippingSchema.Query}
    }

    type Mutation {
        ${UserSchema.mutation}
        ${ProductSchema.mutation}
        ${CartSchema.Mutation}
        ${OrderSchema.Mutation}
        ${ShippingSchema.Mutation}
    }
`;