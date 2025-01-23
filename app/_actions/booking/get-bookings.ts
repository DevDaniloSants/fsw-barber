"use server"

import { auth } from "@/app/_lib/auth"
import { db } from "@/app/_lib/prisma"

export const getBookings = async () => {
  const session = await auth()

  return await db.booking.findMany({
    where: {
      userId: session?.user?.id,
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  })
}
