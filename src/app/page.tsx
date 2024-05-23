import { CircleUserIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/shared/ui/button"
import { Card, CardContent } from "@/shared/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/shared/ui/carousel"

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

const REVIEWS = [
  {
    user: "emmett@example.com",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    user: "charlie@example.com",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    user: "kristy@example.com",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    user: "yolanda@example.com",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }
]

export default function Dashboard() {
  return (
    <main className="h-screen flex flex-col gap-20 w-full pt-10 justify-start items-center">
      <div className="flex pl-10 bg-zinc-100 justify-between items-center">
        <div className="w-1/2">
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
            className="rounded-s-3xl border-2 border-r-0 border-primary/20 p-1 pr-0"
            width={850}
            draggable={false}
            height={400}
            alt="img"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center justify-center">
        <h1 className="text-5xl font-semibold underline">Review</h1>
        <Carousel
          opts={{
            align: "start"
          }}
          className="w-[92%]"
        >
          <CarouselContent>
            {REVIEWS.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex flex-col gap-2 items-center justify-center p-6">
                      <div className="flex gap-1 p-2 rounded w-full justify-center items-center">
                        <CircleUserIcon size={30} />
                        <span className="text-lg">{item.user}</span>
                      </div>
                      <p className="text-xs">{item.text}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </main>
  )
}
