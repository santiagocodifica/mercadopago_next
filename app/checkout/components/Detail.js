export default function Detail({ total, subtotal, cart }){

  return(
    <div>
      <div>
        <h3>Productos</h3>
        <ul>
          { cart && cart.map(cart_product => {
            return(
              <li key={cart_product.cart_id}>
                { cart_product.name } {cart_product.type } ${ cart_product.price}
              </li>
            )
          })}
        </ul>
        <h3>Entrega: ${ total - subtotal }</h3>

      </div>
      Total: ${ total }
    </div>
  )
}