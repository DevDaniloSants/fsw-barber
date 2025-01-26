import { db } from "../_lib/prisma"
import BarbershopItem from "../_components/barbershop-item"
import Search from "../_components/search"

const BarbershopsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ title?: string; service?: string }>
}) => {
  const { title, service } = await searchParams

  const barbershops = await db.barbershop.findMany({
    where: {
      OR: [
        title
          ? {
              name: {
                contains: title,
                mode: "insensitive",
              },
            }
          : {},
        service
          ? {
              services: {
                some: {
                  name: {
                    contains: service,
                    mode: "insensitive",
                  },
                },
              },
            }
          : {},
      ],
    },
    include: {
      services: true,
    },
  })

  return (
    <div className="p-5">
      <Search />
      <h2 className="mb-3 mt-6 text-xs uppercase text-gray-400">
        Resultados para &quot;{title || service}&quot;
      </h2>
      {barbershops.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      ) : (
        <p className="text-center text-sm text-gray-400">
          Nenhum resultado encontrado
        </p>
      )}
    </div>
  )
}

export default BarbershopsPage
