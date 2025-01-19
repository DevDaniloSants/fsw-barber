"use server"

import { db } from "@/app/_lib/prisma"
import { endOfDay, startOfDay } from "date-fns"

interface GetBookings {
  serviceId: string
  date: Date
}

export const getBookings = async ({ serviceId, date }: GetBookings) => {
  return db.booking.findMany({
    where: {
      serviceId,
      date: {
        gte: startOfDay(date),
        lte: endOfDay(date),
      },
    },
  })
}
