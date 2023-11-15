import firebase_app from "@/app/config";
import { getFirestore, updateDoc, doc } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function updateOrder(order_id) {
  let update_order = null
  let update_order_error = null

  const order_ref = doc(db, "orders", order_id);

  try {
    update_order = await updateDoc(order_ref, {
      "status": "pago confirmado"
    });
  } catch(e) {
    update_order_error = e
  }
  return { update_order, update_order_error }
}