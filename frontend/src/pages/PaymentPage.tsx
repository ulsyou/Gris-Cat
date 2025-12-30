import '../styles/striple.css'

// Stripe payment integration - commented out as not in use
// import { Elements } from '@stripe/react-stripe-js'
// import {
//   Appearance,
//   loadStripe,
//   StripeElementsOptions,
// } from '@stripe/stripe-js'
import React from 'react'
// import { useEffect, useState } from 'react'

// import CheckoutForm from '../components/payment/CheckoutForm'

// const stripePromise = import.meta.env.VITE_STRIPE_PRUBLIC_KEY
//   ? loadStripe(import.meta.env.VITE_STRIPE_PRUBLIC_KEY)
//   : null

export default function PaymentPage() {
  // const [clientSecret, setClientSecret] = useState('')

  // useEffect(() => {
  //   // Create PaymentIntent as soon as the page loads
  //   fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/checkout`, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ items: [{ id: 'xl-tshirt' }] }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setClientSecret(data.clientSecret))
  // }, [])

  // const appearance: Appearance = {
  //   theme: 'stripe',
  // }
  // const options: StripeElementsOptions = {
  //   clientSecret,
  //   appearance,
  // }

  // if (!stripePromise) {
  //   return (
  //     <div className="App">
  //       <p>Stripe is not configured. Please set VITE_STRIPE_PRUBLIC_KEY in your .env file.</p>
  //     </div>
  //   )
  // }

  // return (
  //   <div className="App">
  //     {clientSecret && (
  //       <Elements options={options} stripe={stripePromise}>
  //         <CheckoutForm />
  //       </Elements>
  //     )}
  //   </div>
  // )

  return (
    <div className="App">
      <p>Payment page - Stripe integration not in use</p>
    </div>
  )
}
