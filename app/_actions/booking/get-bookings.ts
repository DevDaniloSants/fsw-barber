"use server"

import { auth } from "@/app/_lib/auth"
import { db } from "@/app/_lib/prisma"

export const getBookings = async () => {
  const session = await auth()
  const now = new Date()

  if (!session?.user) {
    return {
      confirmedBookings: [],
      finishedBookings: [],
    }
  }

  const [confirmedBookings, finishedBookings] = await Promise.all([
    db.booking.findMany({
      where: {
        userId: session.user.id,
        date: {
          gte: now,
        },
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
    }),
    db.booking.findMany({
      where: {
        userId: session.user.id,
        date: {
          lte: now,
        },
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
    }),
  ])

  return {
    confirmedBookings: confirmedBookings.map((booking) => ({
      ...booking,
      service: {
        ...booking.service,
        price: Number(booking.service.price),
      },
    })),
    finishedBookings: finishedBookings.map((booking) => ({
      ...booking,
      service: {
        ...booking.service,
        price: Number(booking.service.price),
      },
    })),
  }
}
