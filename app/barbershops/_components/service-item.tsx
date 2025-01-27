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
import { AVAILABLE_HOURS } from "@/app/_constants/avaible-hours"
import { useEffect, useMemo, useState } from "react"
import { isPast, isToday, set } from "date-fns"
import { createBooking } from "@/app/_actions/booking/create-booking"
import { useSession } from "next-auth/react"
import { Booking } from "@prisma/client"
import { toast } from "sonner"
import { Dialog, DialogContent } from "@/app/_components/ui/dialog"
import SignInDialog from "@/app/_components/sign-in-dialog"
import { getDailyBookings } from "@/app/_data_access/booking/get-daily-bookings"
import BookingSummary from "@/app/_components/booking-summary"
import { useRouter } from "next/navigation"

interface ServiceItemProps {
  service: BarbershopServiceDto
  barbershop: Pick<BarbershopDto, "name">
}

interface GetTimeListProps {
  bookings: Booking[]
  selectedDay: Date
}

const getTimeList = ({ bookings, selectedDay }: GetTimeListProps) => {
  return AVAILABLE_HOURS.filter((time) => {
    const hour = time.split(":")[0]
    const minute = time.split(":")[1]

    const timeIsOnThePast = isPast(
      set(new Date(), {
        hours: Number(hour),
        minutes: Number(minute),
      }),
    )

    if (timeIsOnThePast && isToday(selectedDay)) {
      return false
    }

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
  const router = useRouter()

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

  const selectedDate = useMemo(() => {
    if (!selectedDay || !selectedTime) return

    return set(selectedDay, {
      hours: Number(selectedTime?.split(":")[0]),
      minutes: Number(selectedTime?.split(":")[1]),
    })
  }, [selectedDay, selectedTime])

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
      if (!data?.user?.id || !selectedDate) {
        return
      }

      await createBooking({
        serviceId: service.id,
        date: selectedDate,
      })

      handleBookingSheetOpenChange()
      toast.success("Reserva realizada com sucesso", {
        action: {
          label: "Agendamentos",
          onClick: () => {
            router.push("/bookings")
          },
        },
      })
    } catch (error) {
      console.error(error)
      toast.error("Não foi possível realizar a reserva")
    }
  }

  const timeList = useMemo(() => {
    if (!selectedDay) return []

    return getTimeList({ bookings: dayBookings, selectedDay })
  }, [dayBookings, selectedDay])

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
                        {timeList.length > 0 ? (
                          timeList.map((time) => (
                            <Button
                              key={time}
                              variant="secondary"
                              size="sm"
                              className="rounded-lg text-xs"
                              onClick={() => handleTimeSelect(time)}
                            >
                              {time}
                            </Button>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500">
                            Não há horários disponíveis para este dia
                          </p>
                        )}
                      </div>
                    )}
                    {selectedDate && (
                      <div className="p-5">
                        <BookingSummary
                          barbershop={barbershop}
                          service={service}
                          selectedDate={selectedDate}
                        />
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
