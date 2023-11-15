import { useCartContext } from "@/app/cart/hooks/useCartContext"
import { useState, useEffect } from "react"

export const useGetSubtotal = () => {
  
  const { cart } = useCartContext()
  const [subtotal, setSubtotal] = useState()

  useEffect(() => {
    const getSubtotal = () => {
      fetch('/api/cart/subtotal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cart),
      })
      .then((response) => response.json())
      .then((response) => {
        setSubtotal(response)
      })
    }

    cart.length > 0 && getSubtotal()
  }, [cart])

  return { subtotal}
}