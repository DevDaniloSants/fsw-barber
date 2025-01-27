import { auth } from "@/app/_lib/auth"
import { db } from "@/app/_lib/prisma"

export const getFinishedBookings = async () => {
  const session = await auth()
  if (!session?.user) {
    return []
  }

  const now = new Date()

  const finishedBookings = await db.booking.findMany({
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
  })

  return finishedBookings.map((booking) => ({
    ...booking,
    service: {
      ...booking.service,
      price: Number(booking.service.price),
    },
  }))
}
