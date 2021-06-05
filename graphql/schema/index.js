const {gql} = require("apollo-server-express");

const UserSchema = require("./user.schema");

module.exports =  gql`

    ${UserSchema.rootSchema}

    type Query {
        ${UserSchema.query}
    }

    type Mutation {
        ${UserSchema.mutation}
    }
`;