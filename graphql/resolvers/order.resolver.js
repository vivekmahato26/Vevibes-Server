const admin = require("firebase-admin");


const db = admin.firestore();
const userRef = db.collection("Users");
const addressRef = db.collection("Address");
const cartRef = db.collection("Cart");
const orderRef = db.collection("Order");

module.exports = {
    Query: {
        getOrder: async(_,args,{req},info) => {
            const orderSnapshot = await db.collection("Order").doc(args.id).get();
            return {
                id: orderSnapshot.id,
                ...orderSnapshot.data()
            }
        },
        getUserOrders: async (_,args,{req},info) => {
            if(req.isAuth) {
                const orderSnapshot = await orderRef.where("user","==",req.userId).get();
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
        createOrder: async(_,args,{req},info) => {
            if(req.isAuth) {
                const date = new Date();
                const cartSnapshot = await db.collection("Cart").doc(args.input.cart).get();
                const cartData = cartSnapshot.data();
                const items = cartData.items;
                if(items.length <= 0){
                    throw new Error("Empty Cart!!!");
                }
                const newOrder = await orderRef.add({
                    cart: args.input.cart,
                    address: args.input.address,
                    user: req.userId,
                    createdAt: date,
                    status: "Order Placed"
                });
                const orderData = await newOrder.get();
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
        cart: async(parent) => {
            const cartSnapshot = await cartRef.doc(parent.cart).get();
            return {
                id: cartSnapshot.id,
                ...cartSnapshot.data()
            };
        },
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
        }
    }
}