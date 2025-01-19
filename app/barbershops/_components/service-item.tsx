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
  SheetTrigger,
} from "@/app/_components/ui/sheet"
import {
  BarbershopDto,
  BarbershopServiceDto,
} from "@/app/_data_access/barbeshop/get-barbershop"

import Image from "next/image"
import { AVAIILABLE_HOURS } from "@/app/_constants/avaible-hours"
import { useState } from "react"
import { format, set } from "date-fns"
import { createBooking } from "@/app/_actions/booking/create-booking"
import { useSession } from "next-auth/react"

interface ServiceItemProps {
  service: BarbershopServiceDto
  barbershop: Pick<BarbershopDto, "name">
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )

  const { data } = useSession()

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDay(date)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
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

      console.log(newDate)

      await createBooking({
        serviceId: service.id,
        userId: data?.user?.id,
        date: newDate,
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
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
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  size={"sm"}
                  variant="secondary"
                  className="rounded-lg text-xs"
                >
                  Reservar
                </Button>
              </SheetTrigger>
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
                      selected={selectedDay}
                      onSelect={handleDateSelect}
                    />
                  </div>
                  <div className="flex w-full gap-2 overflow-auto border-b border-solid p-5">
                    {AVAIILABLE_HOURS.map((hour) => (
                      <Button
                        key={hour}
                        variant={hour === selectedTime ? "default" : "outline"}
                        className="rounded-full font-light"
                        onClick={() => handleTimeSelect(hour)}
                      >
                        {hour}
                      </Button>
                    ))}
                  </div>
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
  )
}
export default ServiceItem
