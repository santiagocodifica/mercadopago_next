"use client"
import Link from "next/link"
import { useCartContext } from "./hooks/useCartContext"

export default function Cart() {

  const { cart, dispatch } = useCartContext()

  const handleClick = (item) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: item
    })
  }

  return(
    <div>
      <h2>Carrito</h2>
      <ul>
        {cart.map(item => {
          return(
            <li key={item.cart_id}>
              {item.name}
              ${item.price}
              <button onClick={() => handleClick(item)}>Quitar</button>
            </li>
          )
        })}
      </ul>
      <Link href="/checkout">Proceder al pago</Link>
    </div>
  )
}