"use client"

import { useState } from "react";
import "../../public/css/cards.css";
import "../../public/css/boton-selector.css"

import data from "../data/data.json"

import Image from "next/image";
import { Vehicle } from "@/types";
import { IndexCarrousel } from "./index-carous";
import MotoPopup from "./moto-popup";
import Link from "next/link";
import { Button } from "./ui/button";
const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };
const whatsappNumber = "+34671222750";
const motos = data.filter((item) => item.tipo === "moto");
const bicicletas = data.filter((item) => item.tipo === "bicicleta");


export const ContainerCards = () => {
    const [show, setShow] = useState("motos"); 
  const itemsToShow: Vehicle[] = show === "motos" ? motos : bicicletas;
  const [dates, setDates] = useState<Record<string, string>>({});


  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };


  const handleFechaInicioChange = (index:number, value:string) => {
    setDates((prevDates) => ({
      ...prevDates,
      [`start-${index}`]: value,
    }));
  };

  const handleFechaTerminoChange = (index:number, value:string) => {
    setDates((prevDates) => ({
      ...prevDates,
      [`end-${index}`]: value,
    }));
  };
  const handleShowMotos = () => setShow("motos");
  const handleShowBicicletas = () => setShow("bicicletas");

  return (
    <div className="disp-container">
        <h2>{show === "motos" ? "Motocicletas" : "Bicicletas"} disponibles</h2>
        <div className="selector-vehiculos">
          <button className="button-motos" onClick={handleShowMotos}>
            Motos
          </button>
          <button className="button-bicis" onClick={handleShowBicicletas}>
            Bicicletas
          </button>
        </div>
        <div className="flex flex-wrap w-full justify-evenly ">
            {itemsToShow.map((item, index) => {
            const photos = Object.values(item.foto);
            const mensajeWhatsapp = `Hola, me gustaría saber más sobre el ${
                item.nombre
            }.
            Fecha de inicio: ${formatDate(dates[`start-${index}`]) || ""}
            Fecha de término: ${formatDate(dates[`end-${index}`]) || ""}`;

            return (
                <div className="card" key={index}>
                  <IndexCarrousel totalItems={itemsToShow.length} photos={photos} index={index} nombre={item.nombre}/>
                <div className="info-card">
                    <h3 className="h3-disp">{item.nombre}</h3>

                    <div className="fecha-container">
                    <label htmlFor={`fechaInicio-${index}`}>
                        Fecha de inicio:
                    </label>
                    <input
                        type="date"
                        id={`fechaInicio-${index}`}
                        value={dates[`start-${index}`] || ""}
                        onChange={(e) => {
                          const fechaInicio = e.target.value;
                          handleFechaInicioChange(index, fechaInicio);
                          
                          // Define el mínimo de la fecha de término como la fecha de inicio, solo si el elemento existe. ESTA PARTE HAY QUE ELIMINARLA!!⚠️
                          const fechaTerminoInput = document.getElementById(`fechaTermino-${index}`) as HTMLInputElement | null;
                          if (fechaTerminoInput) {
                            fechaTerminoInput.min = fechaInicio;
                          }
                        }}
                        required
                        min={getCurrentDate()} 
                    />
                    <label htmlFor={`fechaTermino-${index}`}>
                        Fecha de termino:
                    </label>
                    <input
                        type="date"
                        id={`fechaTermino-${index}`}
                        value={dates[`end-${index}`] || ""}
                        onChange={(e) =>
                        handleFechaTerminoChange(index, e.target.value)
                        }
                        required
                        min={dates[`start-${index}`] || getCurrentDate()} 
                    />
                    </div>

                    <p className="price-disp">Fianza: {item.fianza} €</p>
                    <p className="price-disp">Precio: {item.precio} €</p>
                </div>
                <div className="button-container gap-4">
                    <Button variant="outline" >
                      
                    <Link
                    className="flex text-xl gap-2"
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                        `${mensajeWhatsapp}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    Reservar{" "}
                    <Image
                    height={1000}
                    width={3000}
                        className="icono-wsp"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2044px-WhatsApp.svg.png"
                        alt="icono whatsapp"
                    /></Link>
                    </Button>
                    <MotoPopup currentMotorcycle={item}/>
                </div>
                </div>
            );
            })}
        </div>
    </div>
  );
};
