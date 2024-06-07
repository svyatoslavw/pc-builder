import Image from "next/image"
import Link from "next/link"

import { Button } from "@/shared/ui/button"

const HERO_INFO = [
  {
    title: "Pre-Built",
    type: "Computers that are already assembled and configured by manufacturers, rather than building one's own computer from scratch."
  },
  {
    title: "Built it yourself",
    type: "Main advantages of building your own computer is flexibility and customization. You have full control over the selection of each component, allowing you to choose the best parts for your specific needs and budget."
  }
]

export default function Dashboard() {
  return (
    <main className="h-screen flex flex-col gap-20 w-full justify-center items-center">
      <div className="2xl:flex xl:flex lg:block block sm:block 2xl:pl-10 2xl:pr-0 xl:pl-10 xl:pr-0 pl-10 pr-10 justify-between items-center">
        <div className="2xl:w-1/2 xl:w-1/2 w-full mb-5">
          <h1 className="underline text-7xl font-bold mb-6">Get Your Perfect PC Today!</h1>
          <div className="text-neutral-600">
            {HERO_INFO.map((hero) => (
              <div key={hero.title} className="my-1 w-5/6">
                <h1 className="mb-3 text-lg font-semibold">{hero.title}</h1>
                <p className="text-sm">{hero.type}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-10">
            <Button size={"lg"}>
              <Link href={"/my-systems"}>Build It Yourself</Link>
            </Button>
            <Button disabled size={"lg"} variant={"outline"}>
              Pre-Build
            </Button>
          </div>
        </div>
        <div>
          <Image
            src={"/bg.png"}
            className="2xl:rounded-s-3xl xl:rounded-s-3xl rounded-3xl border-2 2xl:border-r-0 xl:border-r-0 border-r-2 border-primary/20 p-1 pr-0"
            width={850}
            draggable={false}
            height={400}
            alt="img"
          />
        </div>
      </div>
    </main>
  )
}
