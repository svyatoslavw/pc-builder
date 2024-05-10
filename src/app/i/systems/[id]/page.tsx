import { BuildService } from "@/entities/build/api/build.service"
import { UserService } from "@/entities/user/api/user.service"
import { SystemPage } from "@/pages/system"

export default async function System({ searchParams }: { searchParams: { [key: string]: string | string[] } }) {
  const products = await BuildService.getAll(searchParams)
  const user = await UserService.getProfile()

  return <SystemPage products={products} user={user} />
}
