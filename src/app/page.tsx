import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { CREATOR, GITHUB_URL, SITE_KEYWORDS, SITE_NAME, SITE_URL } from "@/shared/lib/config/seo.config"
import { Button } from "@/shared/ui/button"
import { SectionContainer } from "@/shared/ui/container"

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

export const metadata: Metadata = {
  icons: {
    icon: "icon.png",
    shortcut: "icon.png"
  },
  title: {
    absolute: `Home - ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    emails: `example@${SITE_NAME}`
  },
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  creator: CREATOR,
  authors: {
    name: CREATOR,
    url: GITHUB_URL
  },
  keywords: SITE_KEYWORDS
}

export default function Home() {
  return (
    <main className="h-screen flex w-full flex-col justify-center items-center">
      <header className="h-16 w-full px-6 absolute left-0 top-0 flex items-center justify-between">
        <h1 className="text-lg font-bold">
          PC <span className="text-blue-500">Builder</span>
        </h1>
        <Link className="hover:text-blue-600 text-sm transition font-medium" href="/i/my-systems">
          Go to my systems
        </Link>
      </header>
      <SectionContainer className="pr-0">
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
              <Link href={"/i/my-systems"}>Build It Yourself</Link>
            </Button>
            <Button disabled size={"lg"} variant={"outline"}>
              Pre-Build
            </Button>
          </div>
        </div>
        <div>
          <Image
            src={"/bg.png"}
            className="rounded-s-3xl border-2 border-r-0 border-primary p-1 pr-0"
            width={950}
            draggable={false}
            height={500}
            alt="img"
          />
        </div>
      </SectionContainer>
    </main>
  )
}
