const admin = require("firebase-admin");

const db = admin.firestore();
const userRef = db.collection("Users");
const productRef = db.collection("Products");


module.exports = {
    Query: {
        getProducts: async(_,args,context,info) => {
            console.log(context);
            const productSnapshot = await productRef.get();
            let res = [];
            productSnapshot.forEach((p) => {
                var productId = p.id;
                res.push({
                    id:productId,
                    ...p.data()
                });
            });
            return res;
        },
        getProductFromID: async(_,args,context,info) => {
            const productSnapshot = await db.collection("Products").doc(args.productId).get();
            var res = {
                id: productSnapshot.id,
                ...productSnapshot.data()
            };
            return res;
        }
    },
    Mutation: {
        addProduct: async(_,args,context,info) => {
            const data = await productRef.add({
                ...args.input
            });
            const productSnapshot = await data.get();
            var res = {
                id: data.id,
                ...productSnapshot.data()
            }
            return res;
        },
        updateProduct: async (_,args,context,info) => {
            const productSnapshot = await db.collection("Products").doc(args.productId).update({
                ...args.updates
            });
            const updateSnapshot = await db.collection("Products").doc(args.productId).get();
            var res = {
                id: updateSnapshot.id,
                ...updateSnapshot.data()
            };
            return res;
        }
    }
}