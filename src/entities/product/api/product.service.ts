import { createServerClient } from "@/shared/api/server"
import { EnumCategory, IProduct } from "@/shared/lib/types"

export const ProductService = {
  async getAll(searchParams: { [key: string]: string | string[] }) {
    const component = searchParams["component"] ?? EnumCategory.PROCESSOR
    const supabase = createServerClient()

    const { data: products, error } = await supabase.from(`${component}`).select("*").order("created_at", { ascending: false })

    if (error) {
      console.log(error.message)
    }

    return (products as IProduct[]) || []
  }
}
