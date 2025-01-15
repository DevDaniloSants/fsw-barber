import { Button } from "@/app/_components/ui/button"
import { Card, CardContent } from "@/app/_components/ui/card"
import { BarbershopService } from "@prisma/client"
import Image from "next/image"

interface ServiceItemProps {
  service: BarbershopService
}

const ServiceItem = ({ service }: ServiceItemProps) => {
  return (
    <Card>
      <CardContent className="flex gap-3 p-3">
        <div className="relative max-h-[130px] min-h-[130px] min-w-[130px] max-w-[130px]">
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            className="rounded-lg object-cover"
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
              }).format(Number(service.price))}
            </p>
            <Button
              size={"sm"}
              variant="secondary"
              className="rounded-lg text-xs"
            >
              Reservar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem
