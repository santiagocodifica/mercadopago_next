import firebase_app from "@/app/config";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore(firebase_app)

export async function getCatalogue(){
  const snapshot = await getDocs(collection(db, "catalogue"))
  const data = []
  snapshot.forEach(doc => {
    data.push({ _id: doc.id, ...doc.data()})
  })

  return await data
}