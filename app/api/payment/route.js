import { MercadoPagoConfig, Payment } from "mercadopago"
import addOrder from "./addOrder";
import updateOrder from "./updateOrder";
import updateStock from "./updateStock";

const client = new MercadoPagoConfig({ accessToken: 'TEST-1955580432607506-022520-dfd8385b74237a18a4920d3bd0a31712-395443012', options: { timeout: 5000, idempotencyKey: 'abc' } });
const payment = new Payment(client);

export async function POST(req){
  const body = await req.json()
  const mercadopago_data = body.mercadopago_data
  const order_data = body.order_data
  const cart = order_data.cart

  // check all the data
  if(!body){
    console.log("body is undefined")
    return
  }

  if(!mercadopago_data){
    console.log("No mercadopago data received")
    return
  }

  if(!order_data){
    console.log("No order data received")
    return
  }else{
    // check for correct delivery data
    if(!order_data.deliveryData){
      console.log("No delivery data received")
      return
    }else{
      if(order_data.deliveryData.deliveryMethod === "pickup"){
        // retiro en pickup
        if(!order_data.deliveryData.email){
          console.log("No email sent")
          return
        }
      }else{
        // envío
        if(!order_data.deliveryData.city || !order_data.deliveryData.neighborhood || !order_data.deliveryData.address || !order_data.deliveryData.postalCode || !order_data.deliveryData.email){
          console.log("Missing shipping information")
          return
        }
      }
    }
    // check for correct cart data
    if(!order_data.cart){
      console.log("No cart information")
      return
    }
    if(order_data.cart.length < 1){
      console.log("Wrong cart information")
      return
    }
  }

  // push order to database (with payment status pending)
  const { order_id, add_order_error } = await addOrder(body)

  if(add_order_error){
    console.log(add_order_error)
    return
  }

  payment.create({
    body: {
      transaction_amount: mercadopago_data.transaction_amount,
      token: mercadopago_data.token,
      issuer_id: mercadopago_data.issuer_id,
      installments: mercadopago_data.installments,
      description: '<DESCRIPTION>',
      payment_method_id: mercadopago_data.payment_method_id,
      payer: {
        email: mercadopago_data.payer.email,
        identification: mercadopago_data.identification
      },
    }
  })
  .then(async () => {
    const { update_order, update_order_error } = await updateOrder(order_id)
    if(update_order_error){
      return update_order
    }
    updateStock(cart)
  })
  .catch(console.log);

  return new Response(order_id)
}