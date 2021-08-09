const {gql} = require("apollo-server-express");

const UserSchema = require("./user.schema");
const ProductSchema = require("./product.schema");
const OrderSchema = require("./order.schema");
const ErrorSchema = require("./error.schema");

module.exports =  gql`

    ${UserSchema.rootSchema}
    ${ProductSchema.rootSchema}
    ${OrderSchema.rootScheme}
    ${ErrorSchema.rootSchema}

    type Query {
        ${UserSchema.query}
        ${ProductSchema.query}
        ${OrderSchema.Query}
    }

    type Mutation {
        ${UserSchema.mutation}
        ${ProductSchema.mutation}
        ${OrderSchema.Mutation}
    }
`;