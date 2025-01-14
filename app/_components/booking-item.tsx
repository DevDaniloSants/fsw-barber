import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Avatar, AvatarImage } from "./ui/avatar"

// TODO: receber agendamento como prop
const BookingItem = () => {
  return (
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
  )
}

export default BookingItem
