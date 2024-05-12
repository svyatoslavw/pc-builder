import { headers } from "next/headers"
import { buffer } from "node:stream/consumers"
import Stripe from "stripe"

import { supabaseAdmin } from "@/shared/api/admin"
import { EnumOrderStatus } from "@/shared/lib/types"

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET!

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: any) {
  const rawBody = await buffer(req.body)
  try {
    const sig = headers().get("stripe-signature")
    let event
    try {
      event = stripe.webhooks.constructEvent(rawBody, sig!, endpointSecret)
    } catch (err: any) {
      return Response.json({ error: `Webhook Error ${err?.message!} ` })
    }
    switch (event.type) {
      case "payment_intent.succeeded":
        //console.log("@payment_intent.succeeded", event.data.object)
        break
      case "checkout.session.completed":
        const session = await stripe.checkout.sessions.retrieve(event.data.object.id, {
          expand: ["line_items"]
        })
        // console.log("@checkout.session.completed", event.data.object)
        // console.log("@checkout.metadata", event.data.object.metadata)
        await onPaymentSucceeded(event.data.object.customer_email as string, session)
        break
      default:
        console.log(`Unhandled event type ${event.type}`)
    }
    return Response.json({})
  } catch (e) {
    return Response.json({ error: `Webhook Error` })
  }
}

async function onPaymentSucceeded(email: string, session: Stripe.Response<Stripe.Checkout.Session>) {
  if (!session || !session.line_items || !session.line_items.data) {
    return Response.json({ error: "Session not found!" })
  }

  const supabase = await supabaseAdmin()
  const { data: user, error: userError } = await supabase.from("users").select("id").eq("email", email).single()
  if (userError) {
    return Response.json({ error: userError.message })
  }
  const systemId = session.metadata?.system_id

  const { error: orderError } = await supabase.from("orders").insert({
    user_id: user.id,
    system_id: systemId,
    status: EnumOrderStatus.CONFIRMED
  })

  if (orderError) {
    return Response.json({ error: orderError.message })
  }
}
