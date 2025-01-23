import { Button } from "./_components/ui/button"
import Image from "next/image"

import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"
import { quickSearchOption } from "./_constants/search"
import BookingItem from "./_components/booking-item"
import Search from "./_components/search"
import Link from "next/link"
import { getBookings } from "./_actions/booking/get-bookings"

const Home = async () => {
  const barberShops = await db.barbershop.findMany({})
  const popularBarberShops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  const confirmedBookings = await (
    await getBookings()
  ).filter((booking) => booking.date > new Date())

  return (
    <div>
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Danilo</h2>
        <p className="text-sm">Sexta, 2 de Janeiro</p>
        <div className="mt-6">
          <Search />
        </div>
        <div className="mt-6 flex items-center gap-3 overflow-auto">
          {quickSearchOption.map((option) => (
            <Button
              key={option.title}
              variant="secondary"
              className="gap-2"
              asChild
            >
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  alt={option.title}
                  width={16}
                  height={16}
                />
                {option.title}
              </Link>
            </Button>
          ))}
        </div>
        <div className="relative mt-4 h-[150px] w-full">
          <Image
            src={"/banner-01.svg"}
            alt="banner"
            priority
            className="rounded-xl object-cover"
            sizes="100%"
            fill
          />
        </div>

        <div className="mt-6">
          <h2 className="mb-3 text-xs font-semibold uppercase text-gray-400">
            Agendamentos
          </h2>

          <div className="flex flex-row gap-2 overflow-x-auto">
            {confirmedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="mb-3 text-xs font-semibold uppercase text-gray-400">
            Recomendados
          </h2>

          <div className="flex w-full gap-2 overflow-auto">
            {barberShops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </div>
        <div className="mt-6">
          <h2 className="mb-3 text-xs font-semibold uppercase text-gray-400">
            Populares
          </h2>

          <div className="flex w-full gap-2 overflow-auto">
            {popularBarberShops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
