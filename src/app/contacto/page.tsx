import Image from "next/image";
import './contactoPage.css'


export default function Page() {
    return (
        <section className='contacto-page'>
                <div className='container-title'>
                    <h2 className='h2-class'>Contacto</h2>
                </div>

                <div className="container-ubicacion">
                    <div className="contacto-ubicacion">
                        <h3>dónde encontrarnos</h3>
                        <p>dirección: Plaza España, 25, 08870 Sitges, Barcelona {/* <span><a href={redirtectToMap} target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-map-pin"></i></a></span> */}</p>
                        <p>teléfono: +34611788889 {/* <a className='a-whats' href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`} target='_blank' rel="noopener noreferrer"><i class="fa-brands fa-whatsapp"></i></a> */}</p>
                        <p>correo electrónico: email@email.com</p>
                        <br />
                        <br />
                        <br />
                        <p>dirección: Plaza España, 25, 08870 Sitges, Barcelona {/* <span><a href={redirtectToMap} target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-map-pin"></i></a></span> */}</p>
                        <p>teléfono: +34611788889 {/* <a className='a-whats' href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`} target='_blank' rel="noopener noreferrer"><i class="fa-brands fa-whatsapp"></i></a> */}</p>
                        <p>correo electrónico: email@email.com</p>
                    </div>
                    <div className="mapa">
                        <a href="https://maps.app.goo.gl/UH9Q6hvPZvU4yzN87" target="_blank" rel="noopener noreferrer">
                            <Image width={1000} height={300} src="/img/map_moto2Go.png" alt="donde encontrarnos" />
                        </a>
                    </div>
                </div>
          
            </section>
    );
}