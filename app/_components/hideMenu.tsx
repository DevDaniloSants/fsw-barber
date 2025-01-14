"use client"

import { usePathname } from "next/navigation"
import Header from "./header"

export default function HideMenu() {
  const pathname = usePathname()
  const hideMenuPaths = ["/barbershops"]

  const hideMenu = pathname.startsWith(hideMenuPaths[0])

  if (hideMenu) {
    return null
  }

  return <Header />
}
