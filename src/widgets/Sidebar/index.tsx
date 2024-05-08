"use client"

import {
  BarChartHorizontalIcon,
  BellIcon,
  CircleChevronLeft,
  CircleChevronRight,
  LucideIcon,
  MoreVertical,
  Tv2Icon,
  UsersIcon
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { createContext, useContext, useState } from "react"

import { Button } from "../../shared/ui/button"
import { Card, CardContent, CardTitle } from "../../shared/ui/card"

import { cn } from "@/shared/lib/utils"

interface ISidebarItem {
  Icon: LucideIcon
  text: string
  active?: boolean
  alert?: boolean
  href: string
}

interface ISidebarContext {
  expanded: boolean
}

const SidebarContext = createContext<ISidebarContext>({ expanded: false })

const UserInfo = ({ expanded }: { expanded: boolean }) => {
  return (
    <div className="flex">
      <img
        src="https://ui-avatars.com/api/?background=2563eb&color=1e3a8a&bold=true"
        alt=""
        className="w-10 h-10 rounded-md"
      />
      <div
        className={cn("flex justify-between items-center overflow-hidden transition-all", {
          ["w-44 ml-3"]: expanded,
          ["w-0"]: !expanded
        })}
      >
        <div className="leading-4">
          <h4 className="font-semibold">John Doe</h4>
          <span className="text-xs text-gray-600">johndoe@gmail.com</span>
        </div>
        <MoreVertical size={20} />
      </div>
    </div>
  )
}

const SidebarItem = ({ Icon, text, active, alert, href }: ISidebarItem) => {
  const { expanded } = useContext(SidebarContext)

  return (
    <Link
      href={href}
      className={cn(
        "relative flex items-center py-1.5 px-2 my-2 font-medium rounded-md cursor-pointer transition-colors group",
        {
          ["bg-gray-100"]: active,
          ["hover:bg-gray-100"]: !active
        }
      )}
    >
      <Icon
        className={cn("text-gray-500", {
          ["text-blue-600"]: active
        })}
      />
      <span
        className={cn(
          "ml-3 text-sm flex-1 overflow-hidden text-gray-500 font-medium transition-all",
          {
            ["text-gray-800 font-semibold"]: active,
            ["w-44 ml-3"]: expanded,
            ["hidden m-0"]: !expanded
          }
        )}
      >
        {text}
      </span>
      {alert && (
        <div
          className={cn("absolute right-2 w-2 h-2 rounded bg-green-400", {
            ["top-2"]: !expanded
          })}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-blue-100 text-blue-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </Link>
  )
}

const Sidebar = () => {
  const pathname = usePathname()
  const [expanded, setExpanded] = useState(true)

  const SIDEBAR_LINKS: ISidebarItem[] = React.useMemo(
    () => [
      {
        text: "Dashboard",
        Icon: BarChartHorizontalIcon,
        href: "/i/dashboard",
        active: pathname?.includes("dashboard")
      },
      {
        text: "Clients",
        Icon: UsersIcon,
        href: "/i/clients",
        active: pathname?.includes("clients")
      },
      {
        text: "My Systems",
        Icon: Tv2Icon,
        href: "/i/systems",
        active: pathname?.includes("systems")
      }
    ],
    [pathname]
  )

  return (
    <aside className="h-screen">
      <Card className="h-full flex flex-col border-t-0 rounded-none">
        <CardTitle className="p-4 mb-4 h-16 flex border-b justify-between text-xl font-bold transition w-full items-center">
          <span
            className={cn("text-2xl font-bold transition w-full", {
              ["hidden"]: !expanded
            })}
          >
            PC Builder
          </span>
          <Button variant={"ghost"} onClick={() => setExpanded((curr) => !curr)} className="p-1.5">
            {expanded ? (
              <CircleChevronLeft color="gray" size={20} />
            ) : (
              <CircleChevronRight color="gray" size={20} />
            )}
          </Button>
        </CardTitle>

        <SidebarContext.Provider value={{ expanded }}>
          <CardContent className="flex-1 px-3">
            {SIDEBAR_LINKS.map(({ Icon, href, text, active }) => (
              <SidebarItem key={href} Icon={Icon} text={text} href={href} active={active} />
            ))}
          </CardContent>

          <div className="border-t flex flex-col gap-4 p-3">
            <SidebarItem
              Icon={BellIcon}
              text="Notifications"
              href={"/i/notifications"}
              active={pathname?.includes("notifications")}
            />
            <UserInfo expanded={expanded} />
          </div>
        </SidebarContext.Provider>
      </Card>
    </aside>
  )
}

export { Sidebar }