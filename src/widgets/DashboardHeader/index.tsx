"use client"

import { usePathname, useSearchParams } from "next/navigation"
import * as React from "react"

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../../shared/ui/breadcrumb"

const DashboardHeader = React.forwardRef<HTMLOListElement, React.HTMLAttributes<HTMLOListElement>>(({ ...props }, ref) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  return (
    <Breadcrumb className="rounded-none flex justify-between w-full border-b h-16 px-6 items-center">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/i/dashboard">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        {pathname && pathname.slice(3) !== "dashboard" && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/i/${pathname.slice(3).split("/")[0]}`} className="capitalize">
                {pathname.slice(3).split("/")[0]}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
        {pathname && pathname.slice(3).includes("systems") && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbItem>{pathname.slice(3).split("/")[1]}</BreadcrumbItem>
            </BreadcrumbItem>
          </>
        )}
        {searchParams && searchParams.get("component") && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="capitalize">{searchParams?.get("component")?.replace("_", " ")}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
      <BreadcrumbList ref={ref} {...props} />
    </Breadcrumb>
  )
})
DashboardHeader.displayName = "DashboardHeader"

export { DashboardHeader }
