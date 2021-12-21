const admin = require("firebase-admin");


const db = admin.firestore();
const userRef = db.collection("Users");
const addressRef = db.collection("Address");
const orderRef = db.collection("Order");

module.exports = {
    Query: {
        getOrder: async (_, args, { req }, info) => {
            const orderSnapshot = await db.collection("Order").doc(args.id).get();
            const orderData = orderSnapshot.data();
            const { status, createdAt } = orderData;
            var temp = [];
            for (let i = 0; i < status.length; i++) {
                temp.push({
                    updatedAt: status[i].updatedAt.toDate(),
                    status: status[i].status,
                    statusCode: status[i].statusCode
                })
            }
            return {
                id: orderSnapshot.id,
                ...orderSnapshot.data(),
                createdAt: createdAt.toDate(),
                status: temp
            }
        },
        getUserOrders: async (_, args, { req }, info) => {
            if (req.isAuth) {
                const userSnapshot = await db.collection("Users").doc(req.userId).get();
                const userdata = userSnapshot.data();
                const orders = userdata.orders;
                var res = [];
                if (orders === undefined || orders === null || orders.length <= 0) {
                    return res;
                }
                for (var i = 0; i < orders.length; i++) {
                    const orderSnapshot = await db.collection("Order").doc(orders[i]).get();
                    const orderData = orderSnapshot.data();
                    const createdAt = orderData.createdAt
                    const { status } = orderData;
                    var temp = [];
                    for (let i = 0; i < status.length; i++) {
                        temp.push({
                            updatedAt: status[i].updatedAt.toDate(),
                            status: status[i].status,
                            statusCode: status[i].statusCode
                        })
                    }
                    res.push({
                        id: orderSnapshot.id,
                        ...orderSnapshot.data(),
                        createdAt: createdAt.toDate(),
                        status: temp
                    })
                }
                return res;
            } else {
                throw new Error("Please Login!!!");
            }
        },
    },
    Mutation: {
        createOrder: async (_, args, { req }, info) => {
            if (req.isAuth) {
                const date = new Date();
                var status = {
                    updatedAt: new Date(),
                    status: "Order Placed",
                    statusCode: "01"
                };
                const newOrder = await orderRef.add({
                    ...args.input,
                    createdAt: date,
                    status: admin.firestore.FieldValue.arrayUnion(status),
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
        },
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
            const { cart } = parent;
            if (cart.length <= 0 || cart === undefined || cart === null) {
                return null;
            }
            const cartSnapshot = await db.collection("UserCart").doc(cart).get();
            return {
                id: cartSnapshot.id,
                ...cartSnapshot.data()
            }
        }
    },
}