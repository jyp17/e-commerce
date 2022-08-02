import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default async function() {
    const collectionRef = collection(db, "products");
    const snapshots = await getDocs(collectionRef);
    let products = [];

    for await (const snapshot of snapshots.docs) {
        const product = snapshot.data();
        product.id = snapshot.id;
        const priceSnapshots = await getDocs(collection(snapshot.ref, "prices"));
        product.price = priceSnapshots.docs[0].data();
        product.priceId = priceSnapshots.docs[0].id;
        products.push(product);
    }
    
    return products;
}