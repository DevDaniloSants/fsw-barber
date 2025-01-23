"use client"

import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Prisma } from "@prisma/client"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import Image from "next/image"
import PhoneItem from "./phone-item"

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>
}
const BookingItem = ({ booking }: BookingItemProps) => {
  const isConfirmed = isFuture(booking.date)
  const {
    service: { barbershop },
  } = booking
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card className="min-w-[85%]">
          <CardContent className="flex justify-between p-0">
            <div className="space-y-3 py-5 pl-5">
              {isConfirmed ? (
                <Badge>Confirmado</Badge>
              ) : (
                <Badge variant="secondary">Finalizado</Badge>
              )}
              <h3 className="font-semibold">{booking.service.name}</h3>
              <div className="flex gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={booking.service.barbershop.imageUrl} />
                </Avatar>
                <p className="text-sm">{barbershop.name}</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm capitalize">
                {format(booking.date, "MMMM", { locale: ptBR })}
              </p>
              <p className="text-2xl">
                {format(booking.date, "dd", { locale: ptBR })}
              </p>
              <p className="text-sm">
                {format(booking.date, "HH:mm", { locale: ptBR })}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="w-[85%]">
        <SheetHeader className="mb-6 p-0 text-left">
          <SheetTitle>Informações da Reserva</SheetTitle>
        </SheetHeader>

        <div className="relative flex h-[180px] w-full items-end">
          <Image
            src="/barbershop-map.webp"
            alt={`Mapa da barbearia ${barbershop.name}`}
            fill
            className="rounded-xl object-cover"
            sizes="100%"
          />

          <Card className="z-50 mx-5 mb-3 w-full rounded-xl">
            <CardContent className="flex items-center gap-3 px-5 py-3">
              <Avatar>
                <AvatarImage src={barbershop.imageUrl} />
              </Avatar>
              <div>
                <h3 className="font-bold">{barbershop.name}</h3>
                <p className="text-xs">{barbershop.address}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-3 mt-6">
          {isConfirmed ? (
            <Badge>Confirmado</Badge>
          ) : (
            <Badge variant="secondary">Finalizado</Badge>
          )}
        </div>
        <Card className="mb-6">
          <CardContent className="space-y-3 p-3">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">{booking.service.name}</h2>
              <p className="text-sm font-light">
                {Intl.NumberFormat("pt-br", {
                  currency: "brl",
                  style: "currency",
                }).format(Number(booking.service.price))}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">Data</p>
              <p className="text-sm">
                {format(booking.date, "d 'de' MMMM", {
                  locale: ptBR,
                })}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">Horário</p>
              <p className="text-sm">
                {format(booking.date, "HH:mm", {
                  locale: ptBR,
                })}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">Barbearia</p>
              <p className="text-sm">{barbershop.name}</p>
            </div>
          </CardContent>
        </Card>
        <div className="space-y-2">
          {barbershop.phones.map((phone, i) => (
            <PhoneItem key={`${phone}${i}`} phone={phone} />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default BookingItem
