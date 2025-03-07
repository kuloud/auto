import { HeroUIProvider } from "@heroui/react"

import { Nav } from "~components/nav"

import { Providers } from "./providers"

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="flex h-screen">
            <div className="border-gray-200 flex flex-col">
              <Nav></Nav>
            </div>
            <div className="flex-1 flex flex-col">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
