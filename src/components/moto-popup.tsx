import { useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import Image from 'next/image'
import { Vehicle } from '@/types'



export default function MotoPopup({currentMotorcycle}:{currentMotorcycle: Vehicle}) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentLanguage, setCurrentLanguage] = useState<"es"|"en"|"fr">('es')

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % currentMotorcycle.fotos.length
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex - 1 + currentMotorcycle.fotos.length) % currentMotorcycle.fotos.length
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Ver detalles</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <div className="relative">
          <Image
            src={currentMotorcycle.fotos[currentImageIndex]}
            alt={currentMotorcycle.nombre}
            className="w-full h-[400px] object-cover rounded-t-lg"
            width={1200}
            height={400}
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 transform -translate-y-1/2"
            onClick={prevImage}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            onClick={nextImage}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{currentMotorcycle.nombre}</h2>
          <p className="text-gray-700 mb-4">
            {currentMotorcycle.descripcion[currentLanguage]}
          </p>
          <div className="flex justify-center space-x-2">
            {['es', 'en', 'fr'].map((lang)  => (
              <Button
                key={lang}
                variant={currentLanguage === lang ? 'default' : 'outline'}
                onClick={() => setCurrentLanguage(lang as 'es'| 'en'| 'fr')}
              >
                {lang}
              </Button>
            ))}
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </DialogContent>
    </Dialog>
  )
}