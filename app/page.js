"use client"
import { useCartContext } from "./cart/hooks/useCartContext"
import Catalogue from "./catalogue/Catalogue"
import { getCatalogue } from "./catalogue/getCatalogue"

export default function Home() {

  return(
    <div className="p-8">
      <h2 className="text-4xl mb-10">Productos</h2>
      <Catalogue />
    </div>
  )
}