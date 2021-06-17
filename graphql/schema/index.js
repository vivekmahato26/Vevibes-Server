const {gql} = require("apollo-server-express");

const UserSchema = require("./user.schema");
const ProductSchema = require("./product.schema");
const CartSchema = require("./cart.schema");
const OrderSchema = require("./order.schema");

module.exports =  gql`

    ${UserSchema.rootSchema}
    ${ProductSchema.rootSchema}
    ${CartSchema.rootSchema}
    ${OrderSchema.rootScheme}

    type Query {
        ${UserSchema.query}
        ${ProductSchema.query}
        ${CartSchema.Query}
        ${OrderSchema.Query}
    }

    type Mutation {
        ${UserSchema.mutation}
        ${ProductSchema.mutation}
        ${CartSchema.Mutation}
        ${OrderSchema.Mutation}
    }
`;