const admin = require("firebase-admin");

const db = admin.firestore();
const productRef = db.collection("Products");

module.exports = {
  Query: {
    getProducts: async (_, args, context, info) => {
      const productSnapshot = await productRef.get();
      let res = [];
      productSnapshot.forEach((p) => {
        var productId = p.id;
        res.push({
          id: productId,
          ...p.data(),
        });
      });
      return res;
    },
    getProductFromID: async (_, args, context, info) => {
      const productSnapshot = await db
        .collection("Products")
        .doc(args.productId)
        .get();
      var res = {
        id: productSnapshot.id,
        ...productSnapshot.data(),
      };
      return res;
    },
    getFeaturedProducts: async (_, args, context, info) => {
      const productSnapshot = await productRef.where("featured", "==", true).get();
      let res = [];
      productSnapshot.forEach((p) => {
        var productId = p.id;
        res.push({
          id: productId,
          ...p.data(),
        });
      });
      return res;
    },
    checkWishlisted: async (_, args, { req }, info) => {
      if (req.isAuth) {
        const userSnapshot = await db.collection("Users").doc(req.userId).get();
        const userData = userSnapshot.data();
        const index = userData.wishlist.findIndex((id) => id === args.productId);
        if (index === -1) {
          return { res: false };
        } else {
          return { res: true };
        }
      } else {
        return { message: "Please Login!!!" }
      }
    }
  },
  Mutation: {
    addProduct: async (_, args, context, info) => {
      const data = await productRef.add({
        ...args.input,
      });

      const productSnapshot = await data.get();
      var res = {
        id: data.id,
        ...productSnapshot.data(),
      };
      return res;
    },
    updateProduct: async (_, args, context, info) => {
      const productSnapshot = await db
        .collection("Products")
        .doc(args.productId)
        .update({
          ...args.updates,
        });
      const updateSnapshot = await db
        .collection("Products")
        .doc(args.productId)
        .get();
      var res = {
        id: updateSnapshot.id,
        ...updateSnapshot.data(),
      };
      return res;
    },
    checkout: async (_, args, { req }, info) => {
      if (req.isAuth) {
        const userSnapshot = await db.collection("Users").doc(req.userId).get();
        const userData = userSnapshot.data();
        let customerId;
        if(userData.stripeId) {
          customerId = userData.stripeId;
        } else {
          var customer = await stripe.customers.create({
            name: userData.name,
            address: userData.address,
          });
          customerId = customer.id
          const userUpdate = await db.collection("Users").doc(req.userId).update({
            stripeId:customerId
          });
        }
        const paymentIntent = await stripe.paymentIntents.create({
          customer: customerId,
          amount: args.amount,
          currency: args.currency,
          payment_method_types: args.paymentMethod,
          description: args.description,
        });
        return paymentIntent.client_secret;
      } else {
        throw new Error("Please Login!!!")
      }
    }
  },
  WishlistedResult: {
    __resolveType: (obj) => {
      if (obj.message) {
        return 'LoginError'
      } else {
        return 'Sucess'
      }
    }
  }
};
