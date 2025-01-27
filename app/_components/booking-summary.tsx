import { ptBR } from "date-fns/locale"

import { Card, CardContent } from "./ui/card"
import { Barbershop } from "@prisma/client"
import { format } from "date-fns"
import { BarbershopServiceDto } from "../_data_access/barbeshop/get-barbershop"

interface BookingSummaryProps {
  service: Pick<BarbershopServiceDto, "name" | "price">
  barbershop: Pick<Barbershop, "name">
  selectedDate: Date
}

const BookingSummary = ({
  service,
  barbershop,
  selectedDate,
}: BookingSummaryProps) => {
  return (
    <Card className="mb-6">
      <CardContent className="space-y-3 p-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">{service.name}</h2>
          <p className="text-sm font-light">
            {Intl.NumberFormat("pt-br", {
              currency: "brl",
              style: "currency",
            }).format(Number(service.price))}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400">Data</p>
          <p className="text-sm">
            {format(selectedDate, "d 'de' MMMM", {
              locale: ptBR,
            })}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400">Horário</p>
          <p className="text-sm">
            {format(selectedDate, "HH:mm", {
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
  )
}

export default BookingSummary
