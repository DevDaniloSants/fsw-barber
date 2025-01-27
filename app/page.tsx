import { Button } from "./_components/ui/button"
import Image from "next/image"

import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"
import { quickSearchOption } from "./_constants/search"
import BookingItem from "./_components/booking-item"
import Search from "./_components/search"
import Link from "next/link"

import { auth } from "./_lib/auth"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { getConfirmedBookings } from "./_data_access/booking/get-confirmed-bookings"

const Home = async () => {
  const session = await auth()
  const barberShops = await db.barbershop.findMany({})
  const popularBarberShops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  const confirmedBookings = await getConfirmedBookings()

  return (
    <div>
      <div className="p-5">
        <h2 className="text-xl font-bold">
          Olá, {session?.user ? session.user.name : "bem-vindo (a)"}
        </h2>
        <p className="text-sm">
          {format(new Date(), "EEEE, dd 'de' LLLL", { locale: ptBR })}
        </p>
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
            src={"/Banner-01.svg"}
            alt="banner"
            priority
            className="rounded-xl object-cover"
            sizes="100%"
            fill
          />
        </div>

        {confirmedBookings.length > 0 && (
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
        )}

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
