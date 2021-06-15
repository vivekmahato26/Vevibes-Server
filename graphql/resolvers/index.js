const UserResolver = require("./user.resolver");
const ProductResolver = require("./product.resolver");
const CartResolver = require("./cart.resolver");

module.exports = {
  Query: {
    ...UserResolver.Query,
    ...ProductResolver.Query,
    ...CartResolver.Query,
  },
  Mutation: {
    ...UserResolver.Mutation,
    ...ProductResolver.Mutation,
    ...CartResolver.Mutation,
  },
  User: UserResolver.User,
  Cart: CartResolver.Cart,
  CartItem: CartResolver.CartItem
};
