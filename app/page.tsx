import { SearchIcon } from "lucide-react"
import { Input } from "./_components/ui/input"
import { Button } from "./_components/ui/button"
import Image from "next/image"

export default function Home() {
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
      </div>
    </div>
  )
}
