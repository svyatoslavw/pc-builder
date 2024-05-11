import { BuildService } from "@/entities/build/api/build.service"
import { UserService } from "@/entities/user/api/user.service"
import { MySystemPage } from "@/pages/my-systems"

export default async function MySystem({ searchParams }: { searchParams: { [key: string]: string | string[] } }) {
  const products = await BuildService.getAll(searchParams)
  const user = await UserService.getProfile()

  return <MySystemPage products={products} user={user} />
}
