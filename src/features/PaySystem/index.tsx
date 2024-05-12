"use client"

import { loadStripe } from "@stripe/stripe-js"
import { CheckCheckIcon, CreditCardIcon, LoaderIcon } from "lucide-react"
import React from "react"

import { createClient } from "@/shared/api/client"
import { checkout } from "@/shared/api/stripe/actions"
import { IBuild, IUser } from "@/shared/lib/types"
import { Button } from "@/shared/ui/button"

async function getProfile() {
  const supabase = createClient()
  const { data } = await supabase.auth.getUser()

  if (data.user) {
    const { data: user, error } = await supabase.from("users").select("*").eq("id", data.user.id).single()

    if (!error) return user as IUser
  }
  return null
}

const PaySystem = ({ build }: { build: IBuild }) => {
  const [isLoading, setIsLoading] = React.useState(false)

  const onPayOrder = React.useCallback(async () => {
    setIsLoading(true)
    const user = await getProfile()
    if (user) {
      const { id: sessionId } = JSON.parse(await checkout(user.email, build.id))
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
      const res = await stripe?.redirectToCheckout({ sessionId })
      if (res?.error) alert("Fail to checkout")
    } else {
      console.log("@error: user not found")
    }
    setIsLoading(false)
  }, [build.id])

  return (
    <Button
      disabled={build.success}
      variant={build.success ? "outline" : "default"}
      onClick={onPayOrder}
      size={"sm"}
      title="Checkout"
      className="disabled:opacity-100"
    >
      {isLoading ? (
        <LoaderIcon className="animate-spin" size={18} />
      ) : build.success ? (
        <CheckCheckIcon size={18} />
      ) : (
        <CreditCardIcon size={18} />
      )}
    </Button>
  )
}

export { PaySystem }
