"use server"

import { db } from "@/app/_lib/prisma"
import { Barbershop, BarbershopService } from "@prisma/client"

export interface GetBarbershop {
  id: string
}

export type BarbershopServiceDto = Omit<BarbershopService, "price"> & {
  price: number
}

export type BarbershopDto = Barbershop & {
  services: BarbershopServiceDto[]
}

export const getBarbershop = async ({
  id,
}: GetBarbershop): Promise<BarbershopDto> => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id,
    },
    include: {
      services: true,
    },
  })

  if (!barbershop) {
    throw new Error("Barbershop not found")
  }

  return {
    ...barbershop,
    services: barbershop.services.map((service) => {
      return {
        ...service,
        price: Number(service.price),
      }
    }),
  }
}
