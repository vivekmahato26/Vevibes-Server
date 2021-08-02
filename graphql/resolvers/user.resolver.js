const admin = require("firebase-admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const stripe = require("../../stripe");

const db = admin.firestore();
const userRef = db.collection("Users");
const verifyRef = db.collection("VerifyUser");
const addressRef = db.collection("Address");
const cardRef = db.collection("Cards");

const secret = "QWE123!@#rtyJKL789&*(jkl$%^";

module.exports = {
  Query: {
    getUsers: async (_, args, context, info) => {
      const data = await userRef.get();
      var res = [];
      data.forEach((d) => {
        var temp = {
          id: d.id,
          ...d.data(),
        };
        res.push(temp);
      });
      return res;
    },
    signIn: async (_, args, context, info) => {
      var email = args.input.email;
      email = email.toLowerCase();
      const userSnapshot = await userRef
        .where("email", "==", email)
        .get();
      const userDoc = userSnapshot.docs.pop();
      if(userSnapshot.empty) {
        throw new Error("Email not Registered!!!")
      }
      const userId = userDoc.id;
      const userData = userDoc.data();
      const auth = await bcrypt.compareSync(
        args.input.password,
        userData.password
      );
      if (auth) {
        const token = jwt.sign({ userId, email: userData.email }, secret);
        return {
          userId,
          token,
          email: userData.email,
        };
      } else {
        throw new Error("Invalid Credentials!!!");
      }
    },
    getAddress: async (_, args, { req }, info) => {
      if (req.isAuth) {
        const userSnapshot = await db.collection("Users").doc(req.userId).get();
        const userData = userSnapshot.data();
        const addressId = userData.address;
        let res = [];
        for (var i = 0; i <addressId.length; i++) {
          const addressSnapshot = await db.collection("Address").doc(addressId[i]).get();
          res.push({
            id: addressSnapshot.id,
            ...addressSnapshot.data(),
          });
        }
        console.log(res);
        return res;
      } else {
        throw new Error("Please Login!!!");
      }
    },
    getUser: async (_, args, { req }, info) => {
      if (req.isAuth) {
        const data = await db.collection("Users").doc(req.userId).get();
        return {
          id: data.id,
          ...data.data(),
        };
      } else {
        throw new Error("Please Login!!!");
      }
    },
    getWishlist: async (_, args, { req }, info) => {
      if (req.isAuth) {
        const data = await db.collection("Users").doc(req.userId).get();
        const userData = data.data();
        if(userData.wishlist === undefined || userData.wishlist.length <= 0){
         return [];
        }
        const wishlist = userData.wishlist;
        var res = [];
        for (var i = 0; i <wishlist.length; i++) {
          const productSnapshot = await db.collection("Products").doc(wishlist[i]).get();
          res.push({
            id: productSnapshot.id,
            ...productSnapshot.data()
          });
        }
        return res;
      } else {
        throw new Error("Please Login!!!");
      }
    },
    getCards: async (_, args,{ req},info) => {
      if(req.isAuth){
        const data = await db.collection("Users").doc(req.userId).get();
        const {cards} = data.data();
        var res = [];
        for (var i = 0; i <cards.length; i++) {
          const cardSnapshot = await db.collection("Cards").doc(cards[i]).get();
          res.push({
            id: cardSnapshot.id,
            ...cardSnapshot.data()
          });
        }
        return res;
      }
      else {
        throw new Error("Please Login!!!")
      }
    }
  },
  Mutation: {
    signUp: async (_, args, context, info) => {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(args.input.password, salt);
      const tempSnapshot = await userRef
        .where("email", "==", args.input.email)
        .get();
      if (!tempSnapshot.empty) {
        throw new Error("Email already exists!!!");
      }
      var email = args.input.email;
      email = email.toLowerCase();
      const snapshot = await userRef.add({
        name: args.input.name,
        email: email,
        password,
      });
      const userId = snapshot.id;
      return userId;
    },
    verifyOTP: async (_, args, context, info) => {
      const snapshot = await verifyRef.where("phone", "==", args.phone).get();
      if (snapshot.empty) {
        console.log("No matching documents.");
        return;
      }
      let verified = false;
      const data = snapshot.docs.pop();
      const verifyId = data.id;
      var verifyObj = data.data();
      if (verifyObj.otp === args.otp) {
        verified = true;
        const user = await userRef.where("phone", "==", args.phone).get();
        const userId = user.docs.pop().id;
        const update = await db.collection("Users").doc(userId).update({
          verified: true,
        });
        const deleteVerify = await db
          .collection("VerifyUser")
          .doc(verifyId)
          .delete();
      }
      return verified;
    },
    changePassword: async (_, args, { req }, info) => {
      if (req.isAuth) {
        let changed = true;
        const password = await bcrypt.hash(args.password, 8);
        const updatePass = await db.collection("Users").doc(req.userId).update({
          password,
        });
        return changed;
      } else {
        throw new Error("Please Login!!!");
      }
    },
    addAddress: async (_, args, { req }, info) => {
      if (req.isAuth) {
        const newAddress = await addressRef.add({
          ...args.input,
        });
        const addressSnapshot = await newAddress.get();
        const addressId = addressSnapshot.id;
        const userUpdate = await db
          .collection("Users")
          .doc(req.userId)
          .update({
            address: admin.firestore.FieldValue.arrayUnion(addressId),
          });
        return {
          id: addressId,
          ...addressSnapshot.data(),
        };
      } else {
        throw new Error("Please Login!!!");
      }
    },
    deleteAddress: async (_, args, { req }, info) => {
      if (req.isAuth) {
        const deleteAddress = await db
          .collection("Address")
          .doc(args.addressId)
          .delete();
        const userUpdate = await db
          .collection("Users")
          .doc(req.userId)
          .update({
            address: admin.firestore.FieldValue.arrayRemove(args.addressId),
          });
        return true;
      } else {
        throw new Error("Please Login!!!");
      }
    },
    addToWishlist: async (_, args, { req }, info) => {
      if (req.isAuth) {
        const userUpdate = await db
          .collection("Users")
          .doc(req.userId)
          .update({
            wishlist: admin.firestore.FieldValue.arrayUnion(args.productId),
          });
        return true;
      } else {
        throw new Error("Please Login!!!");
      }
    },
    removeFromWishlist: async (_, args, { req }, info) => {
      if (req.isAuth) {
        const userUpdate = await db
          .collection("Users")
          .doc(req.userId)
          .update({
            wishlist: admin.firestore.FieldValue.arrayRemove(args.productId),
          });
        return true;
      } else {
        throw new Error("Please Login!!!");
      }
    },
    updateAddress: async (_, args, { req }, info) => {
      if (req.isAuth) {
        const updateAddress = await db.collection("Address").doc(args.addressId).update({
          ...args.input
        });
        return true;
      } else {
        throw new Error("Please Login!!!");
      }
    },
    addCard: async (_, args, { req }, info) => {
      if (req.isAuth){
        const exp = args.input.expires;
        const paymentMethod = await stripe.paymentMethods.create({
          type: 'card',
          card: {
            number: args.input.number,
            exp_month: exp.split("/")[0],
            exp_year: exp.split("/")[1],
          },
        });
        const userSnapshot = await db.collection("Users").doc(req.userId).get();
        const {cards} = userSnapshot.data();
        for (var i = 0; i <cards.length; i++) {
          const cardSnapshot = await db.collection("Cards").doc(cards[i]).get();
          const {fingerprint} = cardSnapshot.data();
          if(paymentMethod.fingerprint === fingerprint) {
            throw new Error("Card Already Added!!!")
          }
        }
        const newCard = await cardRef.add({
          ...args.input,
          fingerprint: paymentMethod.card.fingerprint,
          brand: paymentMethod.card.brand,
        });
        const cardSnapshot = await newCard.get();
        const cardId = cardSnapshot.id;
        const userUpdate = await db
          .collection("Users")
          .doc(req.userId)
          .update({
            cards: admin.firestore.FieldValue.arrayUnion(cardId),
          });
        return {
          id: cardId,
          ...cardSnapshot.data(),
        };
      } else {
        throw new Error("Please Login!!!")
      }
    },
    deleteCard: async (_, args, { req }, info) => {
      if (req.isAuth) {
        const deleteCard = await db
          .collection("Cards")
          .doc(args.cardId)
          .delete();
        const userUpdate = await db
          .collection("Users")
          .doc(req.userId)
          .update({
            cards: admin.firestore.FieldValue.arrayRemove(args.cardId),
          });
        return true;
      } else {
        throw new Error("Please Login!!!");
      }
    }
  },
  User: {
    address: async (parent) => {
      const res = [];
      if(parent.address === undefined) {
        return res;
      }
      const address = parent.address;
      for (var i = 0; i < address.length; i++) {
        const addressSnapshot = await db
          .collection("Address")
          .doc(address[i])
          .get();
        const addressId = addressSnapshot.id;
        res.push({
          id: addressId,
          ...addressSnapshot.data(),
        });
      }
      return res;
    },
    wishlist: async (parent) => {
      const res = [];
      if(parent.wishlist === undefined) {
        return res;
      }
      const wishlist = parent.wishlist;
      for (var i = 0; i < wishlist.length; i++) {
        const productSnapshot = await db
          .collection("Products")
          .doc(wishlist[i])
          .get();
        const productId = productSnapshot.id;
        res.push({
          id: productId,
          ...productSnapshot.data(),
        });
      }
      return res;
    },
    cards: async (parent) => {
      const res = [];
      if(parent.cards === undefined) {
        return res;
      }
      const cards = parent.cards;
      for (var i = 0; i < cards.length; i++) {
        const cardSnapshot = await db
          .collection("Cards")
          .doc(cards[i])
          .get();
        const cardId = cardSnapshot.id;
        res.push({
          id: cardId,
          ...cardSnapshot.data(),
        });
      }
      return res;
    }
  },
};
