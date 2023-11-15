import firebase_app from "@/app/config";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

const db = getFirestore(firebase_app)

export default async function updateStock(cart){

  const group_products = await cart.groupBy(({ id }) => {
    return id
  })

  const ultimate = await group_products.map(group => {
    return group.groupBy(({ order_data }) => order_data.color)
  })

  console.log("grouped products: ", ultimate)
  console.log("cart products: ", cart)


  await Promise.all(cart.map(async item => {

    const item_color = item.order_data.color
    const catalogue_id = item.id
    const catalogue_ref = doc(db, "catalogue", catalogue_id)
    const catalogue_snap = await getDoc(catalogue_ref);

    if (catalogue_snap.exists()) {

      const data = catalogue_snap.data()
      const new_colors_array = await Promise.all(data.colors.map(color => {
        console.log(color)
        if(color.name === item_color){
          return {
            name: color.name,
            stock: color.stock - 1
          }
        }else{
          return color
        }
      }))

      // update entire array from database
      try {
        console.log("enters")
        await updateDoc(catalogue_ref, {
          "colors": new_colors_array
        });
      } catch(e) {
        update_order_error = e
      }

    } else {
      console.log("No such document!");
    }
  }))

  return
}