"use client"
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
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
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import SignInDialog from "./sign-in-dialog"

const AppSidebar = () => {
  const { data: session } = useSession()

  const handleSignOutClick = () => signOut()

  return (
    <Sidebar>
      <SidebarHeader className="px-5 pb-0 pt-5">
        <span className="mb-6">Menu</span>

        {session?.user ? (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={session.user.image ?? ""} />
            </Avatar>
            <div>
              <h2 className="font-semibold">{session.user.name}</h2>
              <p className="text-xs text-gray-300">{session.user.email}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <h2 className="font-bold">Olá. Faça seu login!</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon" className="rounded-lg">
                  <LogInIcon />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%] rounded-lg">
                <SignInDialog />
              </DialogContent>
            </Dialog>
          </div>
        )}
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
                <CustomSidebarMenu
                  key={option.title}
                  href={`/barbershops?service=${option.title}`}
                >
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

        {session?.user && (
          <SidebarMenuButton
            className="rounded-lg py-5"
            onClick={handleSignOutClick}
          >
            <LogOutIcon size={18} />
            Sair da conta
          </SidebarMenuButton>
        )}
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar
