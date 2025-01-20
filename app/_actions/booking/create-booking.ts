"use server"

import { auth } from "@/app/_lib/auth"
import { db } from "@/app/_lib/prisma"
import { revalidatePath } from "next/cache"

interface CreateBooking {
  serviceId: string
  date: Date
}

export const createBooking = async (params: CreateBooking) => {
  const session = await auth()
  if (!session) {
    throw new Error("Unauthorized")
  }

  if (!session.user?.id) {
    throw new Error("User not found")
  }

  const userId = session.user.id

  await db.booking.create({
    data: {
      ...params,
      userId,
    },
  })

  revalidatePath("/barbershops/[id]", "page")
}
