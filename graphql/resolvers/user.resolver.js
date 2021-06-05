const admin = require("firebase-admin");

const db = admin.firestore();
const userRef = db.collection("Users");
const verifyRef = db.collection("VerifyUser");

module.exports = {
  Query: {
    getUsers: async (_, args, context, info) => {
      const data = await userRef.get();
      var res = [];
      data.forEach((d) => {
        var temp = {
          id: d.id,
          ...d
        }
        res.push(temp);
      });
      return res;
    },
  },
  Mutation: {
    signUp: async (_, args, context, info) => {
      const data = await userRef.add({
        name: args.input.name,
        email: args.input.email,
        phone: args.input.phone,
      });
      return {
        userId: 123,
        email: 123,
        token: 123,
      };
    },
  },
};
