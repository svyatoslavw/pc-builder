import { ProductService } from "@/entities/product/api/product.service"
import { ResetConctructor } from "@/features/ResetConctructor"
import { Card, CardContent, CardDescription, CardFooter } from "@/shared/ui/card"
import { CategoryList } from "@/widgets/CategoryList"
import { DashboardHeader } from "@/widgets/DashboardHeader"
import { ProductList } from "@/widgets/ProductList"

export default async function SystemBuilder({ searchParams }: { searchParams: { [key: string]: string | string[] } }) {
  const products = await ProductService.getAll(searchParams)

  return (
    <main className="w-full">
      <div className="flex w-full">
        <DashboardHeader />
      </div>
      <Card className="flex border-none rounded-none">
        <CardContent className="filter w-72 flex flex-col border-0 border-r p-0 rounded-none">
          <CardDescription className="flex-1 px-2">
            <CategoryList />
          </CardDescription>
          <CardFooter className="border-t flex p-2 justify-center">
            <ResetConctructor />
          </CardFooter>
        </CardContent>
        <ProductList products={products} />
      </Card>
    </main>
  )
}
