const admin = require("firebase-admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = admin.firestore();
const userRef = db.collection("Users");
const verifyRef = db.collection("VerifyUser");
const addressRef = db.collection("Address");

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
      const userSnapshot = await userRef
        .where("email", "==", args.input.email)
        .get();
      const userDoc = userSnapshot.docs.pop();
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
        addressId.map(async (a) => {
          const addressSnapshot = await db.collection("Address").doc(a).get();
          res.push({
            id: addressSnapshot.id,
            ...addressSnapshot.data(),
          });
          return res;
        });
      } else {
        throw new Error("Please Login!!!");
      }
    },
  },
  Mutation: {
    signUp: async (_, args, context, info) => {
      const password = await bcrypt.hash(args.input.password, 8);
      const tempSnapshot = await userRef
        .where("email", "==", args.input.email)
        .get();
      if (!tempSnapshot.empty) {
        throw new Error("Email already exists!!!");
      }
      const snapshot = await userRef.add({
        name: args.input.name,
        email: args.input.email,
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
        let changed = false;
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
  },
  User: {
    address: async (parent) => {
      const res = [];
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
  },
};
