import { Filter } from "@/entities/filter/ui/Filter"
import { PriceFilter } from "@/features/Filter/PriceFilter"
import { SortByFilter } from "@/features/Filter/SortByFilter"
import { ResetConstructor } from "@/features/ResetConstructor"
import { SaveSystem } from "@/features/SaveSystem"
import { IProduct, IUser } from "@/shared/lib/types"
import { Card, CardContent, CardDescription, CardFooter } from "@/shared/ui/card"
import { CategoryList } from "@/widgets/CategoryList"
import { DashboardHeader } from "@/widgets/DashboardHeader"
import { ProductList } from "@/widgets/ProductList"

interface ISystemPage {
  initialProducts: IProduct[]
  user: IUser
}

const MySystemPage = ({ initialProducts, user }: ISystemPage) => {
  return (
    <main className="w-full">
      <div className="flex w-full">
        <DashboardHeader>
          <SaveSystem user={user} />
        </DashboardHeader>
      </div>
      <Card className="flex border-none rounded-none">
        <CardContent className="filter 2xl:w-72 xl:w-72 lg:w-72 w-14 flex flex-col border-none border-r p-0 rounded-none">
          <CardDescription className="flex-1 px-2">
            <CategoryList />
          </CardDescription>
          <CardFooter className="border-t flex p-2 justify-center">
            <ResetConstructor />
          </CardFooter>
        </CardContent>
        <Card className="filter border-none rounded-none overflow-y-auto px-6 w-full test">
          <Filter>
            <SortByFilter />
            <PriceFilter />
          </Filter>
          <ProductList initialProducts={initialProducts} />
        </Card>
      </Card>
    </main>
  )
}

export { MySystemPage }
