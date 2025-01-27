"use client"

import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Prisma } from "@prisma/client"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import Image from "next/image"
import PhoneItem from "./phone-item"
import { Button } from "./ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog"
import { deleteBooking } from "../_actions/booking/delete-booking"
import { useState } from "react"
import { toast } from "sonner"
import BookingSummary from "./booking-summary"

interface BookingItemProps {
  booking: Omit<
    Prisma.BookingGetPayload<{
      include: {
        service: {
          include: {
            barbershop: true
          }
        }
      }
    }>,
    "service"
  > & {
    service: Omit<
      Prisma.BarbershopServiceGetPayload<{
        include: {
          barbershop: true
        }
      }>,
      "price"
    > & {
      price: number
    }
  }
}
const BookingItem = ({ booking }: BookingItemProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false)

  const isConfirmed = isFuture(booking.date)
  const {
    service: { barbershop },
  } = booking

  const handleCancelBooking = async () => {
    try {
      await deleteBooking(booking.id)
      setIsSheetOpen(false)
      setIsAlertDialogOpen(false)
      toast.success("Agendamento cancelado com sucesso!")
    } catch (error) {
      console.error(error)
      toast.error("Ocorreu um erro ao cancelar o agendamento")
    }
  }

  const handleSheetOpenChange = (open: boolean) => {
    setIsSheetOpen(open)
  }

  const handleAlertDialogOpenChange = (open: boolean) => {
    setIsAlertDialogOpen(open)
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger asChild>
        <Card className="min-w-[85%] cursor-pointer">
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
      <SheetContent
        className="flex w-[85%] flex-col"
        aria-describedby="booking-info"
      >
        <SheetHeader className="mb-6 p-0 text-left">
          <SheetTitle>Informações da Reserva</SheetTitle>
          <SheetDescription />
        </SheetHeader>

        <div className="flex flex-1 flex-col">
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
          <BookingSummary
            barbershop={barbershop}
            service={booking.service}
            selectedDate={booking.date}
          />
          <div className="space-y-2">
            {barbershop.phones.map((phone, i) => (
              <PhoneItem key={`${phone}${i}`} phone={phone} />
            ))}
          </div>
        </div>
        <SheetFooter>
          <div className="flex w-full items-center justify-between gap-3">
            <SheetClose asChild>
              <Button variant="secondary" className="w-full">
                Voltar
              </Button>
            </SheetClose>
            {isConfirmed && (
              <AlertDialog
                open={isAlertDialogOpen}
                onOpenChange={handleAlertDialogOpenChange}
              >
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    Cancelar reserva
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent className="w-[85%] rounded-lg p-4">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Cancelar Reserva</AlertDialogTitle>
                    <AlertDialogDescription>
                      Tem certeza que deseja cancelar esse agendamento?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <div className="flex w-full items-end gap-3">
                      <AlertDialogCancel asChild>
                        <Button className="w-full">Voltar</Button>
                      </AlertDialogCancel>
                      <AlertDialogAction asChild>
                        <Button
                          className="w-full"
                          onClick={handleCancelBooking}
                        >
                          Confirmar
                        </Button>
                      </AlertDialogAction>
                    </div>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default BookingItem
