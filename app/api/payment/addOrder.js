import firebase_app from "@/app/config";
import { getFirestore, addDoc, collection, serverTimestamp } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function addOrder(data) {
  let order_id = null
  let add_order_error = null
  try {
    const new_order = await addDoc(collection(db, "orders"), {
      ...data,
      "status": "esperando pago",
      "price": data.mercadopago_data.transaction_amount,
      "timestamp": serverTimestamp()
    });
    console.log(new_order.id)
    order_id = new_order.id
  } catch(e) {
    add_order_error = e
  }
  return { order_id, add_order_error }
}