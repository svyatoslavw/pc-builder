import type { Metadata } from "next"
import { Radio_Canada } from "next/font/google"

import "./globals.css"
import { Providers } from "@/app/providers"
import { UserService } from "@/entities/user/api/user.service"
import { CREATOR, GITHUB_URL, SITE_KEYWORDS, SITE_NAME, SITE_URL } from "@/shared/lib/config/seo.config"
import { Sidebar } from "@/widgets/Sidebar"

const inter = Radio_Canada({ weight: ["400", "500", "600", "700"], subsets: ["latin"] })

export const metadata: Metadata = {
  icons: {
    icon: "icon.png",
    shortcut: "icon.png"
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

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await UserService.getProfile()

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <main className="flex">
            <Sidebar user={user} />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
