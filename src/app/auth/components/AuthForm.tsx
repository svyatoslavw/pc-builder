"use client"

import { Toaster } from "react-hot-toast"

import { LoginForm } from "@/app/auth/components/LoginForm"
import { RegisterForm } from "@/app/auth/components/RegisterForm"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"

const AuthForm = () => {
  return (
    <section className="flex justify-center items-center h-screen">
      <div className="min-w-[400px] border p-3 rounded-xl">
        <div className="w-full space-y-3">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid place-content-center w-full grid-cols-2 dark:bg-black border">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm />
            </TabsContent>
            <Toaster />
          </Tabs>
        </div>
      </div>
    </section>
  )
}

export { AuthForm }
