"use client"
import firebase_app from "@/app/config";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const db = getFirestore(firebase_app)

export default function useGetProduct(id){
  const [product, setProduct] = useState()
  const [subproducts, setSubproducts] = useState()

  useEffect(() => {
    getProduct(id)
  }, [])

  const getProduct = async (id) => {
    const product_ref = doc(db, "catalogue", id);
    const product_snap = await getDoc(product_ref);
  
    if (product_snap.exists()) {
      setProduct(product_snap.data())
      getSubproducts(product_snap.data().products)
    } else {
      console.log("No such document!");
    }
  }

  const getSubproducts = async (products_array) => {
    const subproducts_array = await Promise.all(products_array.map(async prod => {
      const subproduct_ref = doc(db, "subproducts", prod.id);
      const subproduct_snap = await getDoc(subproduct_ref);
      if (subproduct_snap.exists()) {
        const data = { ...subproduct_snap.data(), id: subproduct_ref.id}
        return data
      } else {
        console.log("No such document!");
      }
    }))
    setSubproducts(subproducts_array)
  }

  return { product, subproducts }
}