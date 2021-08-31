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
      stripeId: String!
      orders: [Order]
      image: String
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
      fingerprint: String!
      brand: String!
    }

    input CardInput {
      number: String!
      name: String!
      expires: String!
    }
    type Addresses {
      res: [Address]
    }
    type Cards {
      res : [Card]
    }
    type Users {
      res: [User]
    }
    type UserId {
      id: String!
    }

    input UserInput {
      name: String
      email: String
      phone: String
      image: String
    }
    
    `,
  query: `
      getUsers: UsersResult
      signIn(input: SigninInput): SigninResult
      getAddress : AddressesResult
      getUser: UserResult
      getWishlist: ProductsResult
      getCards: CardsResult
`,
  mutation: `
    addCard(input:CardInput): CardResult
    deleteCard(cardId: String!): BooleanResult
    signUp(input: SignupInput): SignupResult
    verifyOTP(phone: String!,otp: String!): BooleanResult
    changePassword(password: String!): BooleanResult
    addAddress(input: AddressInput): AddressResult
    updateAddress(input: AddressInput,addressId: String!): BooleanResult
    deleteAddress(addressId: String!): BooleanResult
    addToWishlist(productId: String!) : BooleanResult
    removeFromWishlist(productId: String!): BooleanResult
    updateUser(input: UserInput): BooleanResult
    generateOTP(phone: String!): String!
`
};
