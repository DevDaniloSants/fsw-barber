"use server"

import { db } from "@/app/_lib/prisma"
import { endOfDay, startOfDay } from "date-fns"

interface GetDailyBookings {
  serviceId: string
  date: Date
}

export const getDailyBookings = async ({
  serviceId,
  date,
}: GetDailyBookings) => {
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
