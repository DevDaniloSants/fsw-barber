import type { Metadata } from "next"
import { Poppins } from "next/font/google"

import "./globals.css"

import { SidebarProvider } from "./_components/ui/sidebar"

import Footer from "./_components/footer"

import { cookies } from "next/headers"
import HideMenu from "./_components/hideMenu"
import { Toaster } from "./_components/ui/sonner"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
  params: { id: string }
}>) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

  return (
    <html lang="pt-br">
      <body className={`${poppins.className} dark antialiased`}>
        <SidebarProvider defaultOpen={defaultOpen}>
          <HideMenu />
          <main className="h-full w-dvw flex-1">{children}</main>
          <Toaster />
          <Footer />
        </SidebarProvider>
      </body>
    </html>
  )
}
