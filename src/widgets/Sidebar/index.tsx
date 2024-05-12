"use client"

import {
  BarChartHorizontalIcon,
  BellIcon,
  CircleChevronLeft,
  CircleChevronRight,
  LucideIcon,
  MoreVertical,
  SaveIcon,
  Tv2Icon,
  UsersIcon
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { createContext, useContext, useState } from "react"

import { Button } from "../../shared/ui/button"
import { Card, CardContent, CardTitle } from "../../shared/ui/card"

import { IUser } from "@/shared/lib/types"
import { cn } from "@/shared/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/shared/ui/dropdown-menu"

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

const UserInfo = ({ expanded, user }: { expanded: boolean; user: IUser }) => {
  return (
    <>
      {user.id ? (
        <div className="flex">
          <Image
            src="https://ui-avatars.com/api/?background=2563eb&color=ffffff&bold=true&name=S+S"
            alt="profile"
            className="rounded-md"
            width={40}
            height={40}
          />
          <div
            className={cn("flex justify-between items-center overflow-hidden transition-all", {
              ["w-44 ml-3"]: expanded,
              ["w-0"]: !expanded
            })}
          >
            <div className="leading-4">
              <h4 className="font-semibold">Sviatoslav</h4>
              <span className="text-xs text-gray-600">{user.email}</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreVertical size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>Copy payment ID</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View customer</DropdownMenuItem>
                <DropdownMenuItem>View payment details</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ) : (
        <SidebarItem Icon={UsersIcon} text="Login" href={"/auth"} active={false} />
      )}
    </>
  )
}

const SidebarItem = ({ Icon, text, active, alert, href }: ISidebarItem) => {
  const { expanded } = useContext(SidebarContext)

  return (
    <Link
      href={href}
      className={cn("relative flex items-center py-1.5 px-2 my-2 font-medium rounded-md cursor-pointer transition-all group", {
        ["bg-gray-100"]: active,
        ["hover:bg-gray-100"]: !active
      })}
    >
      <Icon
        className={cn("text-gray-500", {
          ["text-blue-600"]: active
        })}
      />
      <span
        className={cn("ml-3 text-sm flex-1 overflow-hidden text-gray-500 font-medium transition-all", {
          ["text-gray-800 font-semibold"]: active,
          ["w-44 ml-3 z-50"]: expanded,
          ["hidden m-0"]: !expanded
        })}
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

const Sidebar = ({ user }: { user: IUser }) => {
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
        href: "/i/my-systems",
        active: pathname?.includes("my-systems")
      },
      {
        text: "Saved Systems",
        Icon: SaveIcon,
        href: "/i/saved-systems",
        active: pathname?.includes("saved-systems")
      }
    ],
    [pathname]
  )

  return (
    <aside className="h-screen">
      <Card className="h-full flex flex-col border-t-0 rounded-none shadow-none">
        <CardTitle className="p-4 mb-4 h-16 flex border-b justify-between text-xl font-bold transition w-full items-center">
          <span
            className={cn("text-2xl font-bold transition w-full", {
              ["hidden"]: !expanded
            })}
          >
            PC Builder
          </span>
          <Button variant={"ghost"} onClick={() => setExpanded((curr) => !curr)} className="p-1.5">
            {expanded ? <CircleChevronLeft color="gray" size={20} /> : <CircleChevronRight color="gray" size={20} />}
          </Button>
        </CardTitle>

        <SidebarContext.Provider value={{ expanded }}>
          <CardContent className="flex-1 px-3">
            {SIDEBAR_LINKS.map(({ Icon, href, text, active }) => (
              <SidebarItem key={href} Icon={Icon} text={text} href={href} active={active} />
            ))}
          </CardContent>

          <div className="border-t flex flex-col gap-4 p-3">
            <SidebarItem Icon={BellIcon} text="Notifications" href={"/i/notifications"} active={pathname?.includes("notifications")} />
            <UserInfo user={user} expanded={expanded} />
          </div>
        </SidebarContext.Provider>
      </Card>
    </aside>
  )
}

export { Sidebar }
