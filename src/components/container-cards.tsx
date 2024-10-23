"use client"

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import Image from "next/image";
import { Vehicle } from "@/types";
import Link from "next/link";
import MotoPopup from "./moto-popup";
import data from "../data/data.json"
import "../../public/css/cards.css";
import "../../public/css/boton-selector.css"

export default function ContainerCards() {
  const [show, setShow] = useState("motos");
  const [dates, setDates] = useState<Record<string, string>>({});

  const motos = useMemo(() => data.filter((item) => item.tipo === "moto"), []);
  const bicicletas = useMemo(() => data.filter((item) => item.tipo === "bicicleta"), []);

  const itemsToShow: Vehicle[] = show === "motos" ? motos : bicicletas;

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  const whatsappNumber = "+34671222750";

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleFechaInicioChange = (index: number, value: string) => {
    setDates((prevDates) => ({
      ...prevDates,
      [`start-${index}`]: value,
    }));
  };

  const handleFechaTerminoChange = (index: number, value: string) => {
    setDates((prevDates) => ({
      ...prevDates,
      [`end-${index}`]: value,
    }));
  };

  const handleShowMotos = () => setShow("motos");
  const handleShowBicicletas = () => setShow("bicicletas");

  return (
    <div className="container mx-auto p-4">
      <h2>{show === "motos" ? "Motocicletas" : "Bicicletas"} disponibles</h2>
      <div className="selector-vehiculos">
        <button className="button-motos" onClick={handleShowMotos}>
          Motos
        </button>
        <button className="button-bicis" onClick={handleShowBicicletas}>
          Bicicletas
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {itemsToShow.map((item, index) => {
          const mensajeWhatsapp = `Hola, me gustaría saber más sobre el ${
            item.nombre
          }.
          Fecha de inicio: ${formatDate(dates[`start-${index}`]) || ""}
          Fecha de término: ${formatDate(dates[`end-${index}`]) || ""}`;
          const photos = Object.values(item.foto);

          return (
            <Card key={`${item.tipo}-${item.nombre}-${index}`} className="flex flex-col">
              <CardHeader className="p-0">
                <div className="aspect-[3/2] relative overflow-hidden rounded-t-lg">
                  <Image
                    src={photos[0]}
                    alt={item.nombre}
                    className="object-cover w-full h-full"
                    width={1000}
                    height={300}
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-grow p-4">
                <CardTitle className="text-lg font-bold mb-2">{item.nombre}</CardTitle>
                <div className="fecha-container">
                  <label htmlFor={`fechaInicio-${index}`}>
                    Fecha de inicio:
                  </label>
                  <input
                    type="date"
                    id={`fechaInicio-${index}`}
                    value={dates[`start-${index}`] || ""}
                    onChange={(e) => handleFechaInicioChange(index, e.target.value)}
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
                    onChange={(e) => handleFechaTerminoChange(index, e.target.value)}
                    required
                    min={dates[`start-${index}`] || getCurrentDate()} 
                  />
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <div className="flex justify-between gap-4 w-full">
                  <Button variant="outline" className="flex-1 ">
                    <Link
                      className="flex text-xl gap-2"
                      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensajeWhatsapp)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="icono-wsp" width={1000} height={300}/>
                      <span className="lg:hidden sm:inline xl:inline">Reservar</span>
                    </Link>
                  </Button>
                  <MotoPopup currentMotorcycle={item}/>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}