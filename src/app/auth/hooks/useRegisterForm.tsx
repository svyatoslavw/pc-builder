import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

import { login } from "@/app/auth/actions"

export const RegisterSchema = z
  .object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, {
      message: "Password must have than 6 characters."
    }),
    confirm: z.string().min(6, {
      message: "Enter your password again"
    })
  })
  .refine((data) => data.confirm === data.password, {
    message: "Password didn't match",
    path: ["confirm"]
  })
export const useRegisterForm = () => {
  const { replace } = useRouter()

  const registerForm = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm: ""
    }
  })

  const onSubmit = registerForm.handleSubmit(async (data: z.infer<typeof RegisterSchema>) => {
    const res = await login(data)
    const { error } = JSON.parse(res)

    if (!error) {
      toast.success("Account created successfully!")
      replace("/")
    } else {
      toast.error("Something went wrong!")
    }
  })

  return {
    state: {
      isLoading: registerForm.formState.isSubmitting
    },
    form: registerForm,
    functions: { onSubmit }
  }
}
