"use client"
import uniqid from 'uniqid';
import { useCartContext } from "@/app/cart/hooks/useCartContext";
import useGetProduct from "./useGetProduct";

export default function Producto({ params }){

  const { product, subproducts } = useGetProduct(params.id)
  const { dispatch } = useCartContext()

  const handleAddToCart = (subproduct) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {...subproduct, cart_id: uniqid()}
    })
  }

  return(
    <div>
      <h1>{ product && product.name }</h1>
      <ul>
        <h2>Opciones:</h2>
        { subproducts && subproducts.map(subproduct => {
          return(
            <li key={subproduct.name}>
              {subproduct.display_name}
              <button onClick={() => handleAddToCart(subproduct)}>agregar al carrito</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}