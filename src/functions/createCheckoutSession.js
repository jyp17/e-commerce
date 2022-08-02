import { db } from "../firebase";
import { collection, doc, addDoc, onSnapshot } from "firebase/firestore";

async function createCheckoutSession(uid, cart) {
    const collectionRef = collection(db, "customers", uid, "checkout_sessions");
    const { id } = await addDoc(collectionRef, {
        mode: "payment",
        success_url: window.location.origin,
        cancel_url: window.location.origin,
        collection_shipping_address: true,
        line_items: cart.map((product) => {
            return ({
                quantity: 1,
                price:product.priceId,
            });
        }),
    });
    console.log(id);

    const cancelStreaming = onSnapshot(doc(db, "customers", uid, "checkout_sessions", id), 
        (snapshot) => {
            let url = snapshot.data().url;
            if (url) {
                cancelStreaming();
                window.location.href=url;
            }
        }
    );
}

export default createCheckoutSession;