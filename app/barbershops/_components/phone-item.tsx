"use client"

import { Button } from "@/app/_components/ui/button"
import { SmartphoneIcon } from "lucide-react"
import { toast } from "sonner"

interface PhoneItemProps {
  phone: string
}

const PhoneItem = ({ phone }: PhoneItemProps) => {
  const handleCopyPhoneClick = (phone: string) => {
    navigator.clipboard.writeText(phone)
    toast.success("Número de telefone copiado com sucesso!")
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <SmartphoneIcon size={20} />
        <p className="text-sm">{phone}</p>
      </div>
      <Button variant="outline" onClick={() => handleCopyPhoneClick(phone)}>
        Copiar
      </Button>
    </div>
  )
}

export default PhoneItem
