import { useState, useEffect } from "react"

export default function Delivery({ setDeliveryData, deliveryData, subtotal, setTotal }){

  const [deliveryMethod, setDeliveryMethod] = useState("shipping")
  const [deliveryPrice, setDeliveryPrice] = useState(50) //default price
  // form inputs
  const [department, setDepartment] = useState("montevideo")
  const [city, setCity] = useState("")
  const [neighborhood, setNeighborhood] = useState("")
  const [address, setAddress] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [comment, setComment] = useState("")
  const [email, setEmail] = useState("")
  // errors
  const [shippingError, setShippingError] = useState()

  const handleSubmitDelivery = () => {

    if(deliveryMethod === "pickup"){
      if(!email){
        setShippingError(["Debes ingresar un email"])
        return
      }
      setDeliveryData({
        deliveryMethod: deliveryMethod,
        email
      })
      setShippingError()
      return
    }

    let emptyFields = []

    if(!city){
      emptyFields.push("Debes ingresar tu ciudad")
    }
    if(!neighborhood){
      emptyFields.push("Debes ingresar tu barrio")
    }
    if(!address){
      emptyFields.push("Debes ingresar una dirección")
    }
    if(!postalCode){
      emptyFields.push("Debes ingresar tu código postal")
    }
    if(!email){
      emptyFields.push("Debes ingresar un email")
    }
    if(!city || !neighborhood || !address || !postalCode || !email){
      setShippingError(emptyFields)
      return
    }

    setDeliveryData({
      deliveryMethod,
      deliveryPrice,
      department,
      city,
      neighborhood,
      address,
      postalCode,
      comment,
      email
    })
    setShippingError()
    return
  }

  useEffect(() => {
    if(deliveryMethod === "shipping"){
      if(department === "montevideo"){
        setDeliveryPrice(50)
      }else{
        setDeliveryPrice(150)
      }
    }else{
      setDeliveryPrice(0)
    }

  }, [deliveryMethod, department])

  useEffect(() => {
    subtotal && setTotal(subtotal + deliveryPrice)
  }, [deliveryPrice, subtotal])

  return(
    <div>
      <h3>Método de entrega</h3>
      <ul>
        <li onClick={() => !deliveryData && setDeliveryMethod("shipping")} className={`border p-2 ${deliveryMethod === "shipping" && "bg-black text-white"}`}>Envío (desde $50)</li>
        <li onClick={() => !deliveryData && setDeliveryMethod("pickup")}  className={`border p-2 ${deliveryMethod === "pickup" && "bg-black text-white"}`}>Retiro pickup (gratuito)</li>
      </ul>
      {
              shippingError &&
                shippingError.map(field => {
                  return <p key={field}>{ field }</p>
                })
            }
      {
        deliveryMethod === "shipping" &&
          <div>
            <h4>Detalles de envío</h4>
            <ul>
              <li>
                <p>Departamento:</p>
                <select disabled={deliveryData ? true : false } onChange={(e) => setDepartment(e.target.value)} value={department} className="p-4 border border-black">
                  <option value="montevideo">Montevideo ($50)</option>
                  <option value="canelones">Canelones ($150)</option>
                  <option value="maldonado">Maldonado ($150)</option>
                  <option value="paysandu">Paysandú ($150)</option>
                </select>
              </li>
              <li>
                <p>Ciudad:</p>
                <input type="text" disabled={deliveryData ? true : false } value={city} onChange={(e) => setCity(e.target.value)} />
              </li>
              <li>
                <p>Barrio:</p>
                <input type="text" disabled={deliveryData ? true : false } value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} />
              </li>
              <li>
                <p>Dirección:</p>
                <input type="text" disabled={deliveryData ? true : false } value={address} onChange={(e) => setAddress(e.target.value)} />
              </li>
              <li>
                <p>Código Postal:</p>
                <input type="text" disabled={deliveryData ? true : false } value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
              </li>
              <li>
                <p>Comentario:</p>
                <input type="text" disabled={deliveryData ? true : false } value={comment} onChange={(e) => setComment(e.target.value)} />
              </li>
            </ul>
          </div>
      }
      <div>
        <p>Email <span>Para enviarte toda la información sobre tu pedido</span></p>
        <input type="email" disabled={deliveryData ? true : false } value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <button onClick={() => handleSubmitDelivery()}>Proceder al pago</button>
    </div>
  )
}