import Image from "next/image";
import Link from "next/link";


function Footer() {
    return (
        <>
            <footer id='contacto'>
                <div className='sobre'>
                    <div className='logo-footer'>
                        <Image src="/img/moto2go_clear.png" alt=""width={100} height={100}/>
                    </div>
                    <div className="menu-footer">
                        <Link href="/">
                            <p>home</p>
                        </Link>
                        <Link href="/sobre">
                            <p>Sobre</p>
                        </Link>
                        <Link href='/cliente'>
                            <p>cliente</p>
                        </Link>
                        <Link href="/contacto">
                            <p>contacto</p>
                        </Link>
                    </div>
                </div>
                <div className='termos-container'>
                    <div className='contacto'>
                        {/* <h3 className='h3-footer'>donde encontranos</h3> */}
                        <div className="donde">
                            <p className='ubicacion'>Plaza España, 25, 08870 Sitges, Barcelona</p>
                            <p>telefono: +34611788889</p>
                            <p>email: email@email.com</p>
                        </div>
                        <div className="donde">
                            <p className='ubicacion'>Plaza España, 25, 08870 Sitges, Barcelona</p>
                            <p>telefono: +34611788889</p>
                            <p>email: email@email.com</p>
                        </div>
                        <div className="hora-trabajo">
                            <h3 className='h3-footer'>Horario</h3>
                            {/* NOTA */}
                            {/* Aquí podemos hacer una función para que el día de la semana esté activo (por ejemplo, si hoy es miércoles, se resalta el miércoles para que el cliente sepa si está abierto o no) */}
                            <p className='dias-de-la-semana'>lunes <span>10am - 7pm</span></p>
                            <p className='dias-de-la-semana'>martes <span>10am - 7pm</span></p>
                            <p className='dias-de-la-semana'>miercules <span>10am - 7pm</span></p>
                            <p className='dias-de-la-semana'>jueves <span>10am - 7pm</span></p>
                            <p className='dias-de-la-semana'>viernes <span>10am - 7pm</span></p>
                            <p className='dias-de-la-semana'>sabado <span>9am - 8pm</span></p>
                            <p className='dias-de-la-semana'>domingo <span>9am - 6pm</span></p>
                        </div>

                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;