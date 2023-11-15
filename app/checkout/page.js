"use client"
import Mercadopago from "./mercadopago";
import { useGetSubtotal } from "./hooks/useGetSubtotal";
import { useEffect, useState } from "react";
import Delivery from "./components/Delivery";
import Detail from "./components/Detail";
import { useCartContext } from "../cart/hooks/useCartContext";

export default function Checkout() {
  const { cart } = useCartContext()
  // estados de precios
  const [total, setTotal] = useState()
  const { subtotal } = useGetSubtotal()
  //delivery data
  const [deliveryData, setDeliveryData] = useState()

  return (
    <div className="p-8 w-1/2">
      <h2 className="font-4xl mb-10">Checkout {subtotal}</h2>
      { subtotal && <Detail total={total} subtotal={subtotal} cart={cart} />}
      <Delivery deliveryData={deliveryData} setDeliveryData={setDeliveryData} subtotal={subtotal} setTotal={setTotal} />
      { deliveryData && cart &&
        <Mercadopago total={total} deliveryData={deliveryData} cart={cart} />
      }
    </div>
  )
}