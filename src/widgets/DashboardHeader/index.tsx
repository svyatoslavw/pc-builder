"use client"

import { usePathname } from "next/navigation"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "../../shared/ui/breadcrumb"

const DashboardHeader = () => {
  const pathname = usePathname()
  return (
    <Breadcrumb className="rounded-none flex w-full border-b h-16 px-6 items-center">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/i/dashboard">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        {pathname?.slice(3) !== "dashboard" && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="capitalize">{pathname?.slice(3)}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export { DashboardHeader }
