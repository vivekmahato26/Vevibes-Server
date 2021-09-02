const admin = require("firebase-admin");

const db = admin.firestore();
const productRef = db.collection("Products");

const stripe = require("../../stripe");

module.exports = {
  Query: {
    getProducts: async (_, args, {req}, info) => {
      const {limit,cursor} = req.query;
      let cursorSnapshot;
      if(cursor) {
        cursorSnapshot = await db.collection("Products").doc(cursor).get();
      }
      var productSnapshot;
      if(cursor) {
        productSnapshot = await productRef.orderBy("name").startAfter(cursorSnapshot).limit(parseInt(limit)).get();
      }
      else {
        productSnapshot = await productRef.orderBy("name").limit(parseInt(limit)).get();
      }
      let res = [];
      productSnapshot.forEach((p) => {
        var productId = p.id;
        res.push({
          id: productId,
          ...p.data(),
        });
      });
      return {res: res};
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
      const {limit,cursor} = req.query;
      let cursorSnapshot;
      if(cursor) {
        cursorSnapshot = await db.collection("Products").doc(cursor).get();
      }
      var productSnapshot;
      if(cursor) {
        productSnapshot = await productRef.orderBy("name").where("featured","==",true).startAfter(cursorSnapshot).limit(parseInt(limit)).get();
      }
      else {
        productSnapshot = await productRef.orderBy("name").where("featured","==",true).limit(parseInt(limit)).get();
      }
      let res = [];
      productSnapshot.forEach((p) => {
        var productId = p.id;
        res.push({
          id: productId,
          ...p.data(),
        });
      });
      return {res: res};
    },
    checkWishlisted: async (_, args, { req }, info) => {
      if (req.isAuth) {
        const userSnapshot = await db.collection("Users").doc(req.userId).get();
        const userData = userSnapshot.data();
        if( userData.wishlist === undefined || userData.wishlist.length <= 0) {
          return { message: "Empty Wishlist!!!" }
        }
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
        const addressSnapshot = await db.collection("Address").doc(userData.address[0]).get();
        const addressData = addressSnapshot.data();
        let customerId;
        if(userData.stripeId) {
          customerId = userData.stripeId;
        } else {
          var customer = await stripe.customers.create({
            name: userData.name,
            address: {
              line1: addressData.line1,
              postal_code: addressData.pin,
              city: addressData.city,
              state: addressData.state,
              country: addressData.countryCode,
            },
            email: userData.email,
            phone: userData.phone,
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
        return { message: "Please Login!!!" }
      }
    }
  },
  BooleanResult: {
    __resolveType: (obj) => {
      if (obj.message) {
        return 'Error'
      } else {
        return 'Sucess'
      }
    }
  },
  ProductResult: {
    __resolveType: (obj) => {
      if (obj.message) {
        return 'Error'
      } else {
        return 'Product'
      }
    }
  }
};
