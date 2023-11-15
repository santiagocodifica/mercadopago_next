"use client"
import { useContext } from "react"
import { CartContext } from "../context/cartContext"

export const useCartContext = () => {
  const context = useContext(CartContext)
  if(!context){ throw Error("useCartContext must be used inside CartContextProvider") }
  return context
}