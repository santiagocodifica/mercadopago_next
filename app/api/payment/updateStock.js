import firebase_app from "@/app/config";
import { getFirestore, updateDoc, doc } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function updateStock(cart){

  const ids_amount_array = await Promise.all(cart.map(async cart_item => {
    
    let quantity = cart_item.stock

    await Promise.all(cart.map(cart_item_2 => {
      console.log(cart_item.id, cart_item_2.id)
      if(cart_item.id === cart_item_2.id){
        quantity = quantity - 1
      }
    }))

    return {
      id: cart_item.id,
      quantity
    }

  }))

  await Promise.all(ids_amount_array.map(async item => {
    const subproduct_ref = doc(db, "subproducts", item.id);
    try {
      await updateDoc(subproduct_ref, {
        stock: item.quantity
      });
    } catch(e) {
      console.log("error: ", e)
    }
  }))

  return
}