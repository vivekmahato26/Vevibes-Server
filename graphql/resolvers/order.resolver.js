const admin = require("firebase-admin");


const db = admin.firestore();
const userRef = db.collection("Users");
const addressRef = db.collection("Address");
const orderRef = db.collection("Order");

const stripe = require("../../stripe");

module.exports = {
    Query: {
        getOrder: async (_, args, { req }, info) => {
            const orderSnapshot = await db.collection("Order").doc(args.id).get();
            return {
                id: orderSnapshot.id,
                ...orderSnapshot.data()
            }
        },
        getUserOrders: async (_, args, { req }, info) => {
            if (req.isAuth) {
                const orderSnapshot = await orderRef.where("user", "==", req.userId).get();
                var res = [];
                orderSnapshot.forEach((order) => {
                    res.push({
                        id: order.id,
                        ...order.data()
                    });
                });
                return res;
            } else {
                throw new Error("Please Login!!!");
            }
        }
    },
    Mutation: {
        createOrder: async (_, args, { req }, info) => {
            if (req.isAuth) {
                const date = new Date();
                const newOrder = await orderRef.add({
                    ...args.input,
                    createdAt: date,
                    status: "Order Placed",
                    user: req.userId,

                });
                const orderData = await newOrder.get();
                const userUpdate = await db
                    .collection("Users")
                    .doc(req.userId)
                    .update({
                        orders: admin.firestore.FieldValue.arrayUnion(orderData.id),
                    });
                return {
                    id: orderData.id,
                    ...orderData.data()
                };
            } else {
                throw new Error("Please Login!!!");
            }
        }
    },
    Order: {
        user: async (parent) => {
            const userSnapshot = await userRef.doc(parent.user).get();
            return {
                id: userSnapshot.id,
                ...userSnapshot.data()
            }
        },
        address: async (parent) => {
            const addressSnapshot = await addressRef.doc(parent.address).get();
            return {
                id: addressSnapshot.id,
                ...addressSnapshot.data()
            }
        },
        cart: async (parent) => {
            const cart = parent.cart;
            var res = [];
            for (var i = 0; i < cart.length; i++) {
                const productSnapshot = await db.collection("Products").doc(cart[i].product).get();
                const productData = productSnapshot.data();
                const productId = productSnapshot.id;
                const temp = {
                    product: {
                        id: productId,
                        ...productData
                    },
                    quantity: cart[i].quantity
                }
                res.push(temp);
            }
            return res;
        }
    }
}