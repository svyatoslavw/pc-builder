"use client"

import { Toaster } from "react-hot-toast"

import { LoginForm } from "./LoginForm"
import { RegisterForm } from "./RegisterForm"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"

const AuthForm = () => {
  return (
    <section className="flex flex-col gap-3 justify-center w-full items-center mt-32">
      <div className="flex rounded-xl py-2 flex-col bg-red-600 font-medium text-center text-white px-8 border min-w-[400px]">
        <span>Login: test@gmail.com</span>
        <span>Password: 123456</span>
      </div>
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
