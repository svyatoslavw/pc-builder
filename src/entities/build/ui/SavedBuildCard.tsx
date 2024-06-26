import Image from "next/image"

import { IBuild } from "@/shared/lib/types"
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui/card"

interface ISavedBuild {
  build: IBuild
  children: React.ReactNode
}

const SavedBuildCard = ({ build, children }: ISavedBuild) => {
  return (
    <Card key={build.id} className="text-neutral-600">
      <CardHeader className="text-xl border-b py-2 flex-row justify-between items-center font-semibold">
        <span> {build.name}</span> {children}
      </CardHeader>
      <CardContent className="flex border-b justify-start gap-10 h-60 my-4 ">
        <Image
          draggable={false}
          alt={build.id}
          src={build.components?.case?.image_url || "/default-case.png"}
          width={300}
          height={300}
          className="object-contain select-none cursor-pointer"
        />
        <ul className="flex flex-col h-full my-2 text-sm w-full list-disc">
          <li>{build.components?.processor?.name}</li>
          <li>{build.components?.motherboard?.name}</li>
          <li>{build.components?.graphics_card?.name}</li>
          <li>{build.components?.memory?.name}</li>
          <li>{build.components?.power_supply?.name}</li>
          <li>{build.components?.hard_drive?.name}</li>
          <li>{build.components?.ssd?.name}</li>
          <li>{build.components?.case?.name}</li>
          <li>{build.components?.os?.name}</li>
        </ul>
      </CardContent>
      <CardFooter className="py-2 justify-between items-end text-neutral-500">
        <span>Total:</span>
        <span className="text-neutral-800 font-semibold underline">{build.total}$</span>
      </CardFooter>
    </Card>
  )
}

export { SavedBuildCard }
