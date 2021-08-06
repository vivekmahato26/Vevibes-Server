const admin = require("firebase-admin");


const db = admin.firestore();
const shippingRef = db.collection("Shipping");
const orderRef = db.collection("Orders");

module.exports = {
    Query: {
        getShipment: async (_,args,{req},info) => {
            if(req.isAuth) {
                const shipmentSnapshot = await db.collection("Shipping").doc(args.shipmentId).get();
                return {
                    id: shipmentSnapshot.id,
                    ...shipmentSnapshot.data()
                }
            } else {
                throw new Error("Please Login!!!");
            }
        }
    },
    Mutation: {
        createShipment: async (_,args,{req},info) => {
            if(req.isAuth) {
                const shipmentAdd = await shippingRef.add({
                    ...args.input,
                });
                const shipmentSnapshot = await shipmentAdd.get();
                return {
                    id: shipmentSnapshot.id,
                    ...shipmentSnapshot.data()
                }
            } else {
                throw new Error("Please Login!!!");
            }
        }
    }
}