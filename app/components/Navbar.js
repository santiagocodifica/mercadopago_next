"use client"
import Link from "next/link"
import { useCartContext } from "../cart/hooks/useCartContext"

export default function Navbar() {

  const { cart } = useCartContext()

  return(
    <header className="p-8 w-full flex bg-gray-100">
      <Link href="/">Memo</Link>
      <span className="grow"></span>
      <Link href="/cart">Carrito ({ cart.length > 0 ? cart.length : "0"})</Link>
    </header>
  )
}