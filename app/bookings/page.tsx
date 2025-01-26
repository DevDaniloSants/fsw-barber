import { notFound } from "next/navigation"
import { getBookings } from "../_actions/booking/get-bookings"
import BookingItem from "../_components/booking-item"
import { auth } from "../_lib/auth"

const BookingPage = async () => {
  const session = await auth()
  if (!session?.user) {
    return notFound()
  }

  const { confirmedBookings, finishedBookings } = await getBookings()

  return (
    <div className="space-y-3 p-5">
      <h1>Agendamentos</h1>

      {confirmedBookings.length > 0 && (
        <h2 className="mb-3 text-xs font-semibold uppercase text-gray-400">
          Confirmados
        </h2>
      )}

      {confirmedBookings.map((booking) => (
        <BookingItem key={booking.id} booking={booking} />
      ))}

      {finishedBookings.length > 0 && (
        <h2 className="mb-3 text-xs font-semibold uppercase text-gray-400">
          Finalizados
        </h2>
      )}

      {finishedBookings.map((booking) => (
        <BookingItem key={booking.id} booking={booking} />
      ))}
    </div>
  )
}

export default BookingPage
