import { auth } from "@/app/_lib/auth"
import { db } from "@/app/_lib/prisma"

export const getConfirmedBookings = async () => {
  const session = await auth()

  if (!session?.user) {
    return []
  }

  const now = new Date()

  const confirmedBookings = await db.booking.findMany({
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
  })

  return confirmedBookings.map((booking) => ({
    ...booking,
    service: {
      ...booking.service,
      price: Number(booking.service.price),
    },
  }))
}
