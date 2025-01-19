"use server"

import { db } from "@/app/_lib/prisma"

interface CreateBooking {
  serviceId: string
  userId: string
  date: Date
}

export const createBooking = async (params: CreateBooking) => {
  return db.booking.create({
    data: params,
  })
}
