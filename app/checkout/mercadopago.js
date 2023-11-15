"use client"
initMercadoPago('TEST-d7c74ba4-56ef-4989-8527-7656c6cd0cd7');
import { initMercadoPago, CardPayment } from '@mercadopago/sdk-react';

export default function Mercadopago({ total, deliveryData, cart }) {

  const initialization = {
    amount: total
  }

  const onSubmit = async (formData) => {
  // callback llamado al hacer clic en el botón enviar datos
  return new Promise((resolve, reject) => {

    if(!deliveryData){
      return
    }

    fetch('/api/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mercadopago_data: formData,
        order_data: {
          deliveryData,
          cart
        }
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        // recibir el resultado del pago
        resolve();
      })
      .catch((error) => {
        // manejar la respuesta de error al intentar crear el pago
        reject();
      });
  });
  };

  const onError = async (error) => {
  // callback llamado para todos los casos de error de Brick
  console.log(error);
  };
  
  const onReady = async () => {
  /*
    Callback llamado cuando Brick está listo.
    Aquí puedes ocultar cargamentos de su sitio, por ejemplo.
  */
  };


  return(
    <section>
      <CardPayment
        initialization={initialization}
        onSubmit={onSubmit}
        onReady={onReady}
        onError={onError}
      />
    </section>
    
  )
}