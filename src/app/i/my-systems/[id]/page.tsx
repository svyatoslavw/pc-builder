import { SystemPage } from "./MySystem"
import { BuildService } from "@/entities/build/api/build.service"
import { UserService } from "@/entities/user/api/user.service"

export default async function MySystem({ searchParams }: { searchParams: { [key: string]: string | string[] } }) {
  const products = await BuildService.getAll(searchParams)
  const user = await UserService.getProfile()

  return <SystemPage products={products} user={user} />
}
