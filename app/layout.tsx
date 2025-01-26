import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./globals.css"

import { SidebarProvider } from "./_components/ui/sidebar"

import Footer from "./_components/footer"

import { cookies } from "next/headers"
import HideMenu from "./_components/hideMenu"
import { Toaster } from "./_components/ui/sonner"
import SessionProvider from "./_providers/session"

const poppins = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "FSW Barber",
  description:
    "Simplifique a gestão da sua barbearia com agendamentos fáceis e gerenciamento de serviços.",
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
        <SessionProvider>
          <SidebarProvider defaultOpen={defaultOpen}>
            <HideMenu />
            <main className="h-full w-dvw flex-1">{children}</main>
            <Toaster />
            <Footer />
          </SidebarProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
