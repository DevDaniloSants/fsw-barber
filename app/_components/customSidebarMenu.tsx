"use Client"

import Link from "next/link"
import { SidebarMenuItem, SidebarMenuButton, useSidebar } from "./ui/sidebar"

interface CustomSidebarMenuProps {
  href: string
  children: React.ReactNode
}

const CustomSidebarMenu = ({ children, href }: CustomSidebarMenuProps) => {
  const { toggleSidebar } = useSidebar()
  return (
    <SidebarMenuItem>
      <SidebarMenuButton className="rounded-lg py-5" asChild>
        <Link
          href={href}
          className="flex items-center gap-2"
          onClick={toggleSidebar}
        >
          {children}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export default CustomSidebarMenu
