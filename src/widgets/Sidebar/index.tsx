"use client"

import { LogOutIcon, MoreVertical } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

import { Button } from "../../shared/ui/button"

import { logout } from "@/app/auth/actions"
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
  text: string
  active?: boolean
  href: string
}

const UserInfo = ({ user }: { user: IUser }) => {
  return (
    <>
      {user.id ? (
        <div className={cn("flex justify-between gap-2 items-center overflow-hidden transition-all")}>
          <span className="text-sm text-gray-600 font-semibold">{user.email}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Profile</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => logout()}>
                <LogOutIcon size={16} className="mr-2" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <SidebarItem text="Login" href={"/auth"} active={false} />
      )}
    </>
  )
}

const SidebarItem = ({ text, active, href }: ISidebarItem) => {
  return (
    <Link
      href={href}
      className={cn("flex items-center gap-2 text-gray-500", {
        ["text-black"]: active
      })}
    >
      {text}
    </Link>
  )
}

const Sidebar = ({ user }: { user: IUser }) => {
  const pathname = usePathname()

  const SIDEBAR_LINKS: ISidebarItem[] = React.useMemo(
    () => [
      {
        text: "My Systems",
        href: "/my-systems",
        active: pathname?.includes("my-systems")
      },
      {
        text: "Saved Systems",
        href: "/saved-systems",
        active: pathname?.includes("saved-systems")
      }
    ],
    [pathname]
  )

  return (
    <div className="flex p-3 border-b w-full justify-between items-center">
      <Link href={"/"} className="2xl:text-2xl cursor-pointer text-xl font-bold transition w-full items-center">
        PC Builder
      </Link>

      <div className="flex items-center gap-4 justify-end w-full px-3">
        {SIDEBAR_LINKS.map(({ href, text, active }) => (
          <SidebarItem key={href} text={text} href={href} active={active} />
        ))}
        {user.role === "admin" && <SidebarItem text="Admin" href={"/admin"} active={pathname?.includes("dashboard")} />}
        <UserInfo user={user} />
      </div>
    </div>
  )
}

export { Sidebar }
