import { MenuIcon } from "lucide-react"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"

import { SidebarTrigger } from "./ui/sidebar"
import AppSidebar from "./app-sidebar"
import Link from "next/link"

const Header = () => {
  return (
    <header>
      <Card className="rounded-none">
        <CardContent className="flex items-center justify-between p-5">
          <Link href={"/"}>
            <Image
              src={"/logo.svg"}
              alt="FSW Barber"
              width={130}
              height={22}
              priority
            />
          </Link>
          <SidebarTrigger variant={"ghost"}>
            <MenuIcon />
          </SidebarTrigger>
        </CardContent>
      </Card>
      <AppSidebar />
    </header>
  )
}

export default Header
