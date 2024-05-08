import { ProductCard } from "@/entities/product/ui/ProductCard"
import { ResetConctructor } from "@/features/ResetConctructor"
import type { IProcessor } from "@/shared/lib/types"
import { Card, CardContent, CardFooter } from "@/shared/ui/card"
import { CategoryList } from "@/widgets/CategoryList"
import { DashboardHeader } from "@/widgets/DashboardHeader"

export const PROCESSORS: IProcessor[] = [
  {
    id: "1",
    name: "Intel Core i5-11600K",
    price: 1199,
    image_url: "/intel.jpg",
    rating: 1299,
    in_stock: true,
    cores: "6",
    threads: "12",
    ghz: 4.1
  },
  {
    id: "2",
    name: "AMD Ryzen 9 5900X",
    price: 1299,
    image_url: "/amd.jpg",
    rating: 549,
    in_stock: true,
    cores: "16",
    threads: "32",
    ghz: 4.3
  },
  {
    id: "3",
    name: "Intel Core i7-11700K",
    price: 1499,
    image_url: "/intel.jpg",
    rating: 1399,
    in_stock: true,
    cores: "8",
    threads: "16",
    ghz: 4.7
  },
  {
    id: "4",
    name: "AMD Ryzen 9 7900X",
    price: 1699,
    image_url: "/amd.jpg",
    rating: 799,
    in_stock: false,
    cores: "16",
    threads: "32",
    ghz: 4.9
  }
]

export default function Systems() {
  return (
    <main className="w-full">
      <DashboardHeader />
      <section className="flex">
        <Card className="filter w-72 flex flex-col border-0 border-r rounded-none">
          <CardContent className="flex-1 px-2">
            <CategoryList />
          </CardContent>
          <CardFooter className="border-t flex p-2 justify-center">
            <ResetConctructor />
          </CardFooter>
        </Card>
        <div className="filter overflow-y-auto p-6 grid grid-cols-4 w-full test gap-6">
          {PROCESSORS.map((processor) => (
            <ProductCard product={processor} key={processor.id} />
          ))}
        </div>
      </section>
    </main>
  )
}
