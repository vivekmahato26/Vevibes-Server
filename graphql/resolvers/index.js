const UserResolver = require("./user.resolver");
const ProductResolver = require("./product.resolver");
const CartResolver = require("./cart.resolver");
const OrderResolver = require("./order.resolver");

module.exports = {
  Query: {
    ...UserResolver.Query,
    ...ProductResolver.Query,
    ...CartResolver.Query,
    ...OrderResolver.Query
  },
  Mutation: {
    ...UserResolver.Mutation,
    ...ProductResolver.Mutation,
    ...CartResolver.Mutation,
    ...OrderResolver.Mutation
  },
  User: UserResolver.User,
  Cart: CartResolver.Cart,
  CartItem: CartResolver.CartItem,
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
  CartResult:CartResolver.CartResult,
  ProductResult: ProductResolver.ProductResult,
};
