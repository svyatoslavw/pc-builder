import * as React from "react"

import { cn } from "../lib/utils"

const SectionContainer = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(({ className, children, ...props }, ref) => (
  <main ref={ref} className={cn("flex h-fit items-center justify-between px-44", className)} {...props}>
    {children}
  </main>
))
SectionContainer.displayName = "SectionContainer"

const LeftSection = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col w-1/4", className)} {...props}>
    {children}
  </div>
))
LeftSection.displayName = "LeftSection"

const RightSection = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-6 w-1/4", className)} {...props}>
    {children}
  </div>
))
RightSection.displayName = "RightSection"

export { LeftSection, RightSection, SectionContainer }
