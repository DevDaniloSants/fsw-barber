"use client"

import { ptBR } from "date-fns/locale"
import { Button } from "@/app/_components/ui/button"
import { Calendar } from "@/app/_components/ui/calendar"
import { Card, CardContent } from "@/app/_components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet"
import {
  BarbershopDto,
  BarbershopServiceDto,
} from "@/app/_data_access/barbeshop/get-barbershop"

import Image from "next/image"
import { AVAIILABLE_HOURS } from "@/app/_constants/avaible-hours"
import { useEffect, useState } from "react"
import { format, set } from "date-fns"
import { createBooking } from "@/app/_actions/booking/create-booking"
import { useSession } from "next-auth/react"
import { Booking } from "@prisma/client"
import { toast } from "sonner"
import { Dialog, DialogContent } from "@/app/_components/ui/dialog"
import SignInDialog from "@/app/_components/sign-in-dialog"
import { getDailyBookings } from "@/app/_actions/booking/get-daily-bookings"

interface ServiceItemProps {
  service: BarbershopServiceDto
  barbershop: Pick<BarbershopDto, "name">
}

const getTimeList = (bookings: Booking[]) => {
  return AVAIILABLE_HOURS.filter((time) => {
    const hour = time.split(":")[0]
    const minute = time.split(":")[1]

    const hasBookingOnCurrentTime = bookings.some(
      (booking) =>
        booking.date.getHours() === Number(hour) &&
        booking.date.getMinutes() === Number(minute),
    )

    if (hasBookingOnCurrentTime) {
      return false
    }
    return true
  })
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const { data } = useSession()

  const [signInDialogIsOpen, setSignInDialogIsOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )
  const [dayBookings, setDayBookings] = useState<Booking[]>([])
  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      if (!selectedDay) return
      const bookings = await getDailyBookings({
        serviceId: service.id,
        date: selectedDay,
      })
      setDayBookings(bookings)
    }

    fetch()
  }, [service.id, selectedDay])

  const handleBookingClick = () => {
    if (data?.user) {
      return setBookingSheetIsOpen(true)
    }

    return setSignInDialogIsOpen(true)
  }

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDay(date)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleBookingSheetOpenChange = () => {
    setSelectedDay(undefined)
    setSelectedTime(undefined)
    setDayBookings([])
    setBookingSheetIsOpen(false)
  }

  const handleCreateBooking = async () => {
    try {
      if (!data?.user?.id || !selectedDay || !selectedTime) {
        return
      }

      const hour = selectedTime?.split(":")[0]
      const minute = selectedTime?.split(":")[1]
      const newDate = set(selectedDay, {
        minutes: Number(minute),
        hours: Number(hour),
      })

      await createBooking({
        serviceId: service.id,
        date: newDate,
      })

      handleBookingSheetOpenChange()
      toast.success("Reserva realizada com sucesso")
    } catch (error) {
      console.error(error)
      toast.error("Não foi possível realizar a reserva")
    }
  }

  return (
    <>
      <Card>
        <CardContent className="flex gap-3 p-3">
          <div className="relative max-h-[130px] min-h-[130px] min-w-[130px] max-w-[130px]">
            <Image
              src={service.imageUrl}
              alt={service.name}
              fill
              className="rounded-lg object-cover"
              sizes="100%"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="mb-2 text-sm font-semibold">{service.name}</h3>
              <p className="text-xs text-gray-500">{service.description}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-primary">
                {Intl.NumberFormat("pt-br", {
                  style: "currency",
                  currency: "BRL",
                }).format(service.price)}
              </p>
              <Sheet
                open={bookingSheetIsOpen}
                onOpenChange={handleBookingSheetOpenChange}
              >
                <Button
                  size={"sm"}
                  variant="secondary"
                  className="rounded-lg text-xs"
                  onClick={handleBookingClick}
                >
                  Reservar
                </Button>

                <SheetContent aria-describedby="" className="flex flex-col p-0">
                  <SheetHeader className="border-b border-solid p-5">
                    <SheetTitle className="text-left text-base font-medium">
                      Fazer Reserva
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex-1">
                    <div className="w-full border-b border-solid py-5">
                      <Calendar
                        locale={ptBR}
                        mode="single"
                        fromDate={new Date()}
                        selected={selectedDay}
                        onSelect={handleDateSelect}
                      />
                    </div>
                    {selectedDay && (
                      <div className="flex w-full gap-2 overflow-auto border-b border-solid p-5">
                        {getTimeList(dayBookings).map((hour) => (
                          <Button
                            key={hour}
                            variant={
                              hour === selectedTime ? "default" : "outline"
                            }
                            className="rounded-full font-light"
                            onClick={() => handleTimeSelect(hour)}
                          >
                            {hour}
                          </Button>
                        ))}
                      </div>
                    )}
                    {selectedTime && selectedDay && (
                      <div className="p-5">
                        <Card>
                          <CardContent className="space-y-3 p-3">
                            <div className="flex items-center justify-between">
                              <h2 className="font-semibold">{service.name}</h2>
                              <p className="text-sm font-light">
                                {Intl.NumberFormat("pt-br", {
                                  currency: "brl",
                                  style: "currency",
                                }).format(service.price)}
                              </p>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-gray-400">Data</p>
                              <p className="text-sm">
                                {format(selectedDay, "d 'de' MMMM", {
                                  locale: ptBR,
                                })}
                              </p>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-gray-400">Horário</p>
                              <p className="text-sm">{selectedTime}</p>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-gray-400">Barbearia</p>
                              <p className="text-sm">{barbershop.name}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </div>
                  <SheetFooter className="p-5">
                    <Button
                      className="w-full rounded-xl"
                      disabled={!selectedTime || !selectedDay}
                      onClick={handleCreateBooking}
                    >
                      Confirmar
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={signInDialogIsOpen}
        onOpenChange={(isOpen) => setSignInDialogIsOpen(isOpen)}
      >
        <DialogContent className="w-[90%] rounded-lg">
          <SignInDialog />
        </DialogContent>
      </Dialog>
    </>
  )
}
export default ServiceItem
