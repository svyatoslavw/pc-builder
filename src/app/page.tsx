import { BadgeCheckIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/shared/ui/button"
import { LeftSection, RightSection, SectionContainer } from "@/shared/ui/container"

const LINKS = [
  {
    name: "Dashboard",
    href: "/i/dashboard"
  },
  {
    name: "My systems",
    href: "/system"
  },
  {
    name: "Settings",
    href: "/settings"
  }
]

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

const CHARACTERICTICS = ["Premium Custom PC", "Ready for High-Performance", "Premium Full Steel Chassis", "Streamer Friendly"]

const PC_COMPONENTS = [
  { title: "Processor", type: "Intel 10th Gen or Ryzen 3000 Processors" },
  { title: "Graphics Card", type: "Up to the NVIDIA GeForce RTX 3080" },
  { title: "Memory", type: "32 GB Ultra-fast 3800mhz Memory" },
  { title: "Cooling", type: "Premium Custom Water cooled CPU" },
  { title: "Storage", type: "1TB NVMe SSD + 2TB HDD Combo" },
  { title: "Motherboard", type: "High-end ATX Motherboard with PCIe 4.0 support" },
  { title: "Case", type: "Sleek Tempered Glass Mid Tower Case with RGB lighting" },
  { title: "Operating System", type: "Windows 10 Pro 64-bit" }
]

export default function Home() {
  return (
    <>
      <header className="bg-primary/5 h-12 px-6 flex items-center justify-between">
        <h1 className="text-lg font-bold">
          PC <span className="text-green-500">Builder</span>
        </h1>
        <div className="flex gap-4 text-sm">
          {LINKS.map((link) => (
            <Link className="hover:text-primary/70 transition font-medium" key={link.name} href={link.href}>
              {link.name}
            </Link>
          ))}
        </div>
      </header>
      <SectionContainer>
        <LeftSection>
          <h1 className="underline text-7xl font-bold mb-6">Get Your Perfect PC Today!</h1>
          <p className="">Choose from Our Pre-build Selection or Build Your Own with Your PC!</p>
          <div className="flex gap-2 mt-10">
            <Button>Pre-Build</Button>
            <Button variant={"outline"}>Build It Yourself</Button>
          </div>
        </LeftSection>
        <Image src={"/3.jpg"} width={600} draggable={false} height={600} alt="img" />
        <RightSection>
          {HERO_INFO.map((hero) => (
            <div>
              <h1 className="mb-3 text-3xl text-green-600 font-semibold">{hero.title}</h1>
              <p>{hero.type}</p>
            </div>
          ))}
        </RightSection>
      </SectionContainer>
      <SectionContainer className="text-secondary bg-primary">
        <LeftSection className="gap-24 h-full">
          <div>
            <h1 className="text-7xl w-full font-medium mb-16 underline">Brend new beast</h1>
            <ul>
              {CHARACTERICTICS.map((char) => (
                <li key={char} className="mb-4 flex gap-2">
                  <BadgeCheckIcon color="#16a34a" /> {char}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-6">
            <p className="text-sm text-secondary/50">
              from <br />
              <span className="text-6xl text-secondary font-bold">$2550</span> in stock
            </p>
            <Button className="w-1/2">Continue</Button>
          </div>
        </LeftSection>
        <Image src={"/case2.png"} width={400} height={760} draggable={false} alt="img" />
        <RightSection className="flex flex-col gap-5 w-1/4">
          {PC_COMPONENTS.map((component) => (
            <div className="border-b-2 border-secondary/10">
              <h1 className="mb-3 text-xl font-semibold">{component.title}</h1>
              <p className="text-secondary/50 text-sm">{component.type}</p>
            </div>
          ))}
        </RightSection>
      </SectionContainer>
    </>
  )
}
