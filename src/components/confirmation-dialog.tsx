'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Link from 'next/link'

interface ConfirmationDialogProps {
  modelName: string
  startDate: string
  endDate: string
  totalDays: number
  pricePerDay: number
  deposit: number
  mensajeWhatsapp: string
}
const whatsappNumber = "+34671222750";

export default function ConfirmationDialog({
  modelName,
  startDate,
  endDate,
  totalDays,
  pricePerDay,
  deposit,
  mensajeWhatsapp,
}: ConfirmationDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  const totalPrice = totalDays * pricePerDay

  const handleConfirm = () => {
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex-1">
          <Image 
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
            alt="WhatsApp" 
            width={24} 
            height={24} 
            className="mr-2" 
          />
          <span className=" text-xl lg:hidden sm:inline xl:inline">Reservar</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirmar Reserva: {modelName}</DialogTitle>
          <DialogDescription>
            Por favor, revisa los detalles de tu reserva.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-center">
            Has escogido del <br />
            <span className="font-semibold">{startDate}</span> al <span className="font-semibold">{endDate}</span> <br />
            {totalDays} días x {pricePerDay}€ = <br />
            <span className="font-bold text-lg">{totalPrice}€ total.</span> <br />
            Este vehículo tiene fianza de <span className="font-semibold">{deposit}€</span>.
          </p>
        </div>
        <DialogFooter className="sm:justify-center">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm}>
          <Link
                      className="flex text-xl gap-2"
                      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensajeWhatsapp)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
            Confirmar Reserva</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}