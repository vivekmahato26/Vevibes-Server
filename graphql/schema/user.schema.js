module.exports = {
  rootSchema: `
    type User {
      id: ID!
      name: String!
      email: String
      phone: String
    }

    input SignupInput {
      name: String!
      email: String!
      phone: String!
    }

    type Auth {
      userId: ID!
      email: String!
      token: String!
    }
    
    `,
  query: `
      getUsers: [User]
`,
mutation: `
    signUp(input: SignupInput): Auth
`
};
