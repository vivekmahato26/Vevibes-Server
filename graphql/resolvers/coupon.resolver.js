const admin = require("firebase-admin");


const db = admin.firestore();
const userRef = db.collection("Users");
const couponRef = db.collection("Coupons");

module.exports = {
    Query: {
        getCoupons: async (_, args, { req }, info) => {
            let res = [];
            const couponsSnapshot = await couponRef.where("active", "==", true).get();
            console.log(couponsSnapshot);
            couponsSnapshot.forEach((coupon) => {
                res.push({
                    id: coupon.id,
                    ...coupon.data()
                });

            })
            return res;
        },
        getUserCoupons: async (_, args, { req }, info) => {
            let res = [];
            const couponsSnapshot = await couponRef.where("active", "==", true).where("user", "==", req.userId).get();
            couponsSnapshot.forEach((coupon) => {
                res.push({
                    id: coupon.id,
                    ...coupon.data()
                });

            })
            return res;
        },
        checkCoupon: async (_, args,{req}, info) => {
            let res = [];
            const couponsSnapshot = await couponRef.where("active", "==", true).where("code","==",args.code).get();
            couponsSnapshot.forEach((coupon) => {
                res.push({
                    id: coupon.id,
                    ...coupon.data()
                });

            })
            return res;
        } 
    },
    Mutation: {
        addCoupon: async (_, args, { req }, info) => {
            const addCoupon = await couponRef.add({
                ...args.input
            });
            const couponSnapshot = await addCoupon.get();
            return {
                id: couponSnapshot.id,
                ...couponSnapshot.data()
            }
        },
        modifyCoupon: async (_, args, { req }, info) => {
            const couponSnapshotModify = await db.collection("Coupons").doc(args.id).update({
                active: args.active
            });
            const couponSnapshot = await db.collection("Coupons").doc(args.id).get();
            return {
                id: couponSnapshot.id,
                ...couponSnapshot.data()
            }
        }

    },
    Coupon: {
        user: async (parent) => {
            const userSnapshot = await userRef.doc(parent.user).get();
            return {
                id: userSnapshot.id,
                ...userSnapshot.data()
            }
        }
    }
}