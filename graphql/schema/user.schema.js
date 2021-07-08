module.exports = {
  rootSchema: `
    type User {
      id: ID!
      name: String!
      email: String
      phone: String
      password: String!
      verified: Boolean!
      address: [Address]
    }

    input SignupInput {
      name: String!
      email: String!
      password: String!
    }

    type Auth {
      userId: ID!
      email: String!
      token: String!
    }

    input SigninInput {
      email: String!
      password: String!
    }

    type Address {
      id: ID!
      name: String!
      address: String!
      landmark: String
      pin: String!
      city: String!
      state: String!
      mobile: String!
      type: String!
    }

    input AddressInput {
      name: String!
      address: String
      landmark: String
      pin: String!
      city: String!
      state: String!
      mobile: String!
      type: String!
    }

    input AddressUpdate {
      name: String
      address: String
      landmark: String
      pin: String
      city: String
      state: String
      mobile: String
      type: String!
    }
    
    `,
  query: `
      getUsers: [User]
      signIn(input: SigninInput): Auth
      getAddress(userId: String!) : [Address]
`,
mutation: `
    signUp(input: SignupInput): String!
    verifyOTP(phone: String!,otp: Int!): Boolean!
    changePassword(password: String!): Boolean!
    addAddress(input: AddressInput): Address
    updateAddress(input: AddressUpdate): Address
    deleteAddress(addressId: String!): Boolean!
`
};
