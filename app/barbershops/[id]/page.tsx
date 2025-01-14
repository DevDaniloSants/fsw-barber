import { db } from "@/app/_lib/prisma"

import Image from "next/image"
import CustomTrigger from "../_components/custom-trigger"
import { Button } from "@/app/_components/ui/button"
import Link from "next/link"
import { ChevronLeftIcon, MapPinIcon, StarIcon } from "lucide-react"
import { notFound } from "next/navigation"

interface BarbeshopPageProps {
  params: { id: string }
}

const Barbershop = async ({ params }: BarbeshopPageProps) => {
  const { id } = await params

  const barbershop = await db.barbershop.findUnique({
    where: {
      id,
    },
  })

  if (!barbershop) return notFound()

  return (
    <div>
      <div className="relative h-[250px] w-full">
        <Image
          src={barbershop?.imageUrl}
          alt={barbershop?.name}
          className="object-cover"
          priority
          fill
          sizes="100%"
        />
        <Button
          size="icon"
          variant="secondary"
          className="absolute left-4 top-4"
          asChild
        >
          <Link href={"/"}>
            <ChevronLeftIcon />
          </Link>
        </Button>
        <CustomTrigger />
      </div>
      <div className="space-y-2 border-b border-solid p-5">
        <h3 className="text-xl font-semibold">{barbershop.name}</h3>
        <div className="flex items-center gap-2">
          <MapPinIcon size={16} className="text-primary" />
          <p className="text-sm">{barbershop.address}</p>
        </div>
        <div className="flex items-center gap-2">
          <StarIcon size={16} className="fill-primary text-primary" />
          <p className="text-sm">5,00 (463 avaliações)</p>
        </div>
      </div>

      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="text-xs font-semibold uppercase text-gray-400">
          Sobre nós
        </h2>
        <p className="text-sm">{barbershop.description}</p>
      </div>
    </div>
  )
}

Barbershop.hideMenu = true

export default Barbershop
