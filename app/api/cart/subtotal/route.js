import { NextResponse } from "next/server";
import firebase_app from "@/app/config";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export async function POST(req) {
  
  const cart = await req.json()

  if(!cart){
    return NextResponse.json({ message: "No hay productos en el carrito" })
  }

  const db = getFirestore(firebase_app)

  let subtotal = 0

  await Promise.all(
    cart.map(async (cart_product) => {
      const subproduct_ref = doc(db, "subproducts", cart_product.id)
      const subproduct_snap = await getDoc(subproduct_ref);
      if (subproduct_snap.exists()) {
        subtotal += subproduct_snap.data().price
      } else {
        console.log("No such document!");
      }
    })
  )

  return NextResponse.json(subtotal)
}