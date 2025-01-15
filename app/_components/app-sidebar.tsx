"use client"
import { CalendarIcon, HomeIcon, LogOutIcon } from "lucide-react"
import {
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  Sidebar,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
} from "./ui/sidebar"
import { quickSearchOption } from "../_constants/search"
import Image from "next/image"
import { Avatar, AvatarImage } from "./ui/avatar"

import CustomSidebarMenu from "./customSidebarMenu"

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="p-5">
        <span className="mb-6">Menu</span>

        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://utfs.io/f/7e309eaa-d722-465b-b8b6-76217404a3d3-16s.png" />
          </Avatar>
          <div>
            <h2 className="font-semibold">Danilo Santos</h2>
            <p className="text-xs text-gray-300">teste@gmail.com</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-5">
        <SidebarGroupContent className="border-y border-solid py-6">
          <SidebarMenu>
            <SidebarGroup className="space-y-3 p-0">
              <CustomSidebarMenu href="/">
                <HomeIcon size={18} />
                <p>Início</p>
              </CustomSidebarMenu>
              <CustomSidebarMenu href="/bookings">
                <CalendarIcon size={18} />
                <p>Agendamentos</p>
              </CustomSidebarMenu>
            </SidebarGroup>
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroupContent className="border-b border-solid pb-6">
          <SidebarMenu>
            <SidebarGroup className="space-y-3 p-0">
              {quickSearchOption.map((option) => (
                <CustomSidebarMenu key={option.title} href="/">
                  <Image
                    src={option.imageUrl}
                    alt={option.title}
                    width={18}
                    height={18}
                  />
                  <p>{option.title}</p>
                </CustomSidebarMenu>
              ))}
            </SidebarGroup>
          </SidebarMenu>
        </SidebarGroupContent>

        <SidebarMenuButton className="rounded-lg py-5">
          <LogOutIcon size={18} />
          Sair da conta
        </SidebarMenuButton>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar
