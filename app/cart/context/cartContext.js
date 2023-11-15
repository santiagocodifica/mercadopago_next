"use client"

import { createContext, useEffect, useReducer } from "react"

export const CartContext = createContext();

export const cart_reducer = (state, action) => {
  switch(action.type){
    case "SET": {
      const cart = [ ...action.payload ]
      localStorage.setItem("cart", JSON.stringify(cart))
      return { cart: cart }
    }
    case "CLEAR": {
      localStorage.removeItem("cart")
      return { cart: [] }
    }
    case "ADD_ITEM": {
      const item_to_add = action.payload
      // calculate selected stock
      let same_in_cart = 0
      state.cart.map(cart_product => {
        if(cart_product.id === item_to_add.id){
          same_in_cart ++
        }
      })
      // check stock
      const stock = item_to_add.stock
      if(stock <= same_in_cart || same_in_cart > 4){
        // no hay mas stock o ya agregaste 5 de este producto
        return { cart: [...state.cart] }
      }

      localStorage.setItem("cart", JSON.stringify([item_to_add, ...state.cart]))
      return { cart: [item_to_add, ...state.cart] }
    }
    case "REMOVE_ITEM": {
      const item_to_remove = action.payload
      const updated_cart = []
      state.cart.map(cart_product => {
        if(cart_product.cart_id === item_to_remove.cart_id){
          return
        } else {
          updated_cart.push(cart_product)
        }
      })

      localStorage.setItem("cart", JSON.stringify(updated_cart))
      return { cart: updated_cart }
    }
    default:
      return state
  }
}

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cart_reducer, {
    cart: []
  })

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"))
    if(cart){
      dispatch({
        type: "SET",
        payload: cart
      })
    }
  }, [])

  return(
    <CartContext.Provider value={{ ...state, dispatch }}>
      { children }
    </CartContext.Provider>
  )
}