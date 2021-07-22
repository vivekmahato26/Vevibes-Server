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
      wishlist: [Product]
      cards: [Card]
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
      line1: String!
      line2: String
      pin: String!
      city: String!
      state: String!
      mobile: String!
      type: String!
      country: String!
      countryCode: String!
    }

    input AddressInput {
      name: String!
      line1: String
      line2: String
      pin: String!
      city: String!
      state: String!
      mobile: String!
      type: String!
      country: String!
      countryCode: String!
    }

    type Card {
      id: String!
      number: String!
      name: String!
      expires: String!
    }

    input CardInput {
      number: String!
      name: String!
      expires: String!
    }
    
    `,
  query: `
      getUsers: [User]
      signIn(input: SigninInput): Auth
      getAddress : [Address]
      getUser: User
      getWishlist: [Product]
      getCards: [Card]
`,
  mutation: `
    addCard(input:CardInput): Card!
    deleteCard(cardId: String!): Boolean!
    signUp(input: SignupInput): String!
    verifyOTP(phone: String!,otp: Int!): Boolean!
    changePassword(password: String!): Boolean!
    addAddress(input: AddressInput): Address
    updateAddress(input: AddressInput,addressId: String!): Boolean!
    deleteAddress(addressId: String!): Boolean!
    addToWishlist(productId: String!) : Boolean!
    removeFromWishlist(productId: String!): Boolean!
`
};
