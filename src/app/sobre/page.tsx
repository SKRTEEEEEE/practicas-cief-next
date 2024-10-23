import "./sobreNosotrosPage.css"
import { Roboto } from 'next/font/google'

const roboto = Roboto({
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap',
  })
export default function Page() {
    return (
        <div className={ `${roboto.className} sobre-container min-h-screen`}>
      <div className="text-container">
      <h2 className='h2'>Sobre Nosotros</h2>
      <p>Nuestra empresa de alquiler de motos en Sitges nació el 1 de abril de 2023, después de varios años de sueños, planificación y pasión por el mundo del motociclismo. 
      </p>
      <p>Después de haber adquirido experiencia valiosa en una de las principales empresas de alquiler de motos en Barcelona, entendimos las necesidades de quienes buscan disfrutar de la libertad y comodidad que solo una moto puede ofrecer. 
      </p>
      <p>Con el tiempo, esa experiencia y pasión, me llevaron a tomar la decisión de emprender mi propio camino. Así nació este proyecto en Sitges con el firme propósito de ofrecer un servicio cercano, personalizado y de calidad a todos nuestros clientes. 
      </p>
      <p>
      En febrero de 2024, damos un nuevo paso con la apertura de Moto2goCastelldefels, ampliando nuestra con el objetivo de satisfacer al máximo las necesidades de los amantes de las motos, ofreciendo motos modernas, seguras y un servicio excepcional que garantice que cada trayecto sea una experiencia inolvidable.
      </p>
      </div>
    </div>
    );
}