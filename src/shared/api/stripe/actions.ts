"use server"

import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function checkout(email: string, buildId: string) {
  return JSON.stringify(
    await stripe.checkout.sessions.create({
      success_url: process.env.APP_URL,
      cancel_url: process.env.APP_URL,
      customer_email: email,
      line_items: [
        {
          price: "price_1PFae7IfatciYQ7ebvqxthgm",
          quantity: 1
        }
      ],
      metadata: {
        system_id: buildId
      },
      mode: "payment"
    })
  )
}

export async function manageBilling(customer_id: string) {
  return JSON.stringify(
    await stripe.billingPortal.sessions.create({
      customer: customer_id,
      return_url: process.env.APP_URL
    })
  )
}
