const UserResolver = require("./user.resolver");
const ProductResolver = require("./product.resolver");
const OrderResolver = require("./order.resolver");

module.exports = {
  Query: {
    ...UserResolver.Query,
    ...ProductResolver.Query,
    ...OrderResolver.Query
  },
  Mutation: {
    ...UserResolver.Mutation,
    ...ProductResolver.Mutation,
    ...OrderResolver.Mutation
  },
  User: UserResolver.User,
  Order: OrderResolver.Order,
  BooleanResult: ProductResolver.BooleanResult,
  SigninResult: UserResolver.SigninResult,
  AddressesResult: UserResolver.AddressesResult,
  ProductsResult:UserResolver.ProductsResult,
  CardsResult:UserResolver.CardsResult,
  UserResult:UserResolver.UserResult,
  CardResult:UserResolver.CardResult,
  AddressResult:UserResolver.AddressResult,
  UsersResult:UserResolver.UsersResult,
  SignupResult:UserResolver.SignupResult,
  ProductResult: ProductResolver.ProductResult,
};
