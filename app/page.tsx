import { SearchIcon } from "lucide-react"
import { Input } from "./_components/ui/input"
import { Button } from "./_components/ui/button"
import Image from "next/image"
import { Card, CardContent } from "./_components/ui/card"
import { Avatar, AvatarImage } from "./_components/ui/avatar"
import { Badge } from "./_components/ui/badge"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"

const Home = async () => {
  const barberShops = await db.barbershop.findMany({})

  return (
    <div>
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Danilo</h2>
        <p className="text-sm">Sexta, 2 de Janeiro</p>
        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça a sua busca..." className="text-xs" />
          <Button>
            <SearchIcon size={16} />
          </Button>
        </div>
        <div className="relative mt-4 h-[150px] w-full">
          <Image
            src={"/banner-01.svg"}
            alt="banner"
            className="rounded-xl object-cover"
            fill
          />
        </div>

        <div className="mt-6">
          <h2 className="mb-3 text-xs font-semibold uppercase text-gray-400">
            Agendamentos
          </h2>

          <Card>
            <CardContent className="flex justify-between p-0">
              <div className="space-y-3 py-5 pl-5">
                <Badge className="w-fit">Confirmado</Badge>
                <h3 className="font-semibold">Corte de Cabelo</h3>
                <div className="flex gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
                  </Avatar>
                  <p className="text-sm">Vintage Barber</p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
                <p className="text-sm">Janeiro</p>
                <p className="text-2xl">02</p>
                <p className="text-sm">10:00</p>
              </div>
            </CardContent>
          </Card>
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
      </div>
    </div>
  )
}

export default Home
