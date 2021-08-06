const admin = require("firebase-admin");

const db = admin.firestore();
const cartRef = db.collection("Cart");

const { v4: uuidv4 } = require("uuid");

module.exports = {
  Query: {
    getCart: async (_, args, { req }, info) => {
      const cartSnapshot = await db.collection("Cart").doc(args.id).get();
      return {
        id: cartSnapshot.id,
        ...cartSnapshot.data(),
      };
    },
    getUserCart: async (_, args, { req }, info) => {
      if (req.isAuth) {
        const cartSnapshot = await cartRef
          .where("user", "==", req.userId)
          .get();
        const cart = cartSnapshot.docs.pop();
        return {
          id: cart.id,
          ...cart.data(),
        };
      }
    },
  },
  Mutation: {
    addToCart: async (_, args, { req }, info) => {
      var user = uuidv4();
      var cart;
      if (req.userId) {
        user = req.userId;
        const cartSnapshot = await cartRef.where("user", "==", user).get();
        if (cartSnapshot.empty) {
          const newCart = await cartRef.add({
            items: admin.firestore.FieldValue.arrayUnion(args.item),
            user,
          });
          cart = await newCart.get();
          return {
            id: cart.id,
            ...cart.data(),
          };
        } else {
          const newCartSnapshot = cartSnapshot.docs.pop();
          const cartId = newCartSnapshot.id;
          const updatedCart = await db
            .collection("Cart")
            .doc(cartId)
            .update({
              items: admin.firestore.FieldValue.arrayUnion(args.item),
            });
          var res = await db.collection("Cart").doc(cartId).get();
          return {
            id: res.id,
            ...res.data(),
          };
        }
      } else {
        const cartSnapshot = await cartRef.add({
          items: admin.firestore.FieldValue.arrayUnion(args.item),
          user,
        });
        cart = await cartSnapshot.get();
        return {
          id: cart.id,
          ...cart.data(),
        };
      }
    },
    removeFromCart: async (_, args, { req }, info) => {
      if (args.item.quantity === 0) {
        const cart = await db.collection("Cart").doc(args.id).get();
        const cartData = cart.data();
        const items = cartData.items;
        const cartSnapshot = await db
          .collection("Cart")
          .doc(args.id)
          .update({
            items: items.filter(item => item.itemId != args.item.itemId)
          });
        const updatedCart = await db.collection("Cart").doc(args.id).get();
        return {
          id: updatedCart.id,
          ...updatedCart.data(),
        };
      } else {
        const cartSnapshot = await db
          .collection("Cart")
          .doc(args.id)
          .update({
            items: {
              quantity: args.item.quantity,
            },
          });
        const updatedCart = await db.collection("Cart").doc(args.id).get();
        return {
          id: updatedCart.id,
          ...updatedCart.data(),
        };
      }
    },
  },
  Cart: {
    user: async (parent) => {
      const userSnapshot = await db.collection("Users").doc(parent.user).get();
      return {
        id: userSnapshot.id,
        ...userSnapshot.data(),
      };
    },
  },
  CartItem: {
    itemId: async (parent) => {
      const product = parent.itemId;
      const productSnapshot = await db
        .collection("Products")
        .doc(product)
        .get();
      return {
        id: productSnapshot.id,
        ...productSnapshot.data(),
      };
    },
  },
  CartResult: {
    __resolveType: (obj) => {
      if (obj.message) {
        return 'Error'
      } else {
        return 'Cart'
      }
    }
  },
};
