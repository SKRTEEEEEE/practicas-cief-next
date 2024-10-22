"use client"

import { useState } from "react";
import "../../public/css/popup.css";
import "../../public/css/cards.css";
import "../../public/css/boton-selector.css"

import data from "../data/data.json"

import Image from "next/image";
const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };
const whatsappNumber = "+34671222750";
const motos = data.filter((item) => item.tipo === "moto");
const bicicletas = data.filter((item) => item.tipo === "bicicleta");


export const ContainerCards = () => {
    const [show, setShow] = useState("motos"); // Estado para iniciar mostrando las motos
  //Recoje las fechas como un estado ℹ️
  const itemsToShow = show === "motos" ? motos : bicicletas;

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const handleCardClick = (vehicle) => setSelectedVehicle(vehicle);
  const closePopup = () => setSelectedVehicle(null);
  const [selectedLanguage, setSelectedLanguage] = useState("es");
  const changeLanguage = (lang) => setSelectedLanguage(lang);
  const [numeroFoto, setNumeroFoto] = useState(1);

  const [dates, setDates] = useState({}); // Estado para armazenar datas por índice

  const [currentImageIndexes, setCurrentImageIndexes] = useState(
    new Array(itemsToShow.length).fill(0)
  );

  // Função para obter a data atual no formato YYYY-MM-DD
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const fotoChange = (val) => {
    const totalFotos = Object.keys(selectedVehicle?.foto || {}).length;
    if (val < totalFotos) {
      return val + 1;
    } else {
      return 1;
    }
  };
  const handleFechaInicioChange = (index, value) => {
    setDates((prevDates) => ({
      ...prevDates,
      [`start-${index}`]: value,
    }));
  };

  const handleFechaTerminoChange = (index, value) => {
    setDates((prevDates) => ({
      ...prevDates,
      [`end-${index}`]: value,
    }));
  };
  const handleNextPhoto = (index, photos) => {
    setCurrentImageIndexes((prevIndexes) => {
      const newIndexes = [...prevIndexes];
      newIndexes[index] =
        prevIndexes[index] === photos.length - 1 ? 0 : prevIndexes[index] + 1;
      return newIndexes;
    });
  };

  const handlePreviousPhoto = (index, photos) => {
    setCurrentImageIndexes((prevIndexes) => {
      const newIndexes = [...prevIndexes];
      newIndexes[index] =
        prevIndexes[index] === 0 ? photos.length - 1 : prevIndexes[index] - 1;
      return newIndexes;
    });
  };
  
  



  const handleShowMotos = () => setShow("motos");
  const handleShowBicicletas = () => setShow("bicicletas");

  console.log("idk: ",selectedVehicle?.foto[numeroFoto]||undefined)
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
                <div className="image-container">
                    <Image
                    height={1000}
                    width={3000}
                    className="img-disp"
                    src={photos[currentImageIndexes[index]]}
                    alt={item.nombre}
                    />
                    {photos.length > 1 && (
                    <div className="image-controls">
                        <button
                        onClick={() => handlePreviousPhoto(index, photos)}
                        className="btn-control"
                        >
                        &#10094;
                        </button>
                        <button
                        onClick={() => handleNextPhoto(index, photos)}
                        className="btn-control"
                        >
                        &#10095;
                        </button>
                    </div>
                    )}
                </div>
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
                        // Define o mínimo da data de término como a data de início
                        document.getElementById(`fechaTermino-${index}`).min = fechaInicio;
                        }}
                        required
                        min={getCurrentDate()} // Bloqueia datas anteriores a hoje
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
                        min={dates[`start-${index}`] || getCurrentDate()} // A data de término deve ser posterior à de início
                    />
                    </div>

                    <p className="price-disp">Fianza: {item.fianza} €</p>
                    <p className="price-disp">Precio: {item.precio} €</p>
                </div>
                <div className="button-container">
                    <a
                    className="btn-disp"
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
                    />
                    </a>
                    <a className="btn-disp" onClick={() => handleCardClick(item)}>
                    Detalles
                    </a>
                </div>
                </div>
            );
            })}
            {/* Popup for selected vehicle */}
            {selectedVehicle && (
            <div className="popup">
                <div className="popup-content">
                <span className="close-btn" onClick={closePopup}>
                    X
                </span>
                <div className="control-image-popup">
                    <button
                    onClick={() => setNumeroFoto(fotoChange(numeroFoto))}
                    className="popup-btn-control"
                    >
                    &#10094;
                    </button>

                    <Image
                    height={1000}
                    width={3000}
                    src={selectedVehicle.foto[numeroFoto]}
                    alt={selectedVehicle.nombre}
                    className="popup-image"
                    />

                    <button
                    onClick={() => setNumeroFoto(fotoChange(numeroFoto))}
                    className="popup-btn-control"
                    >
                    &#10095;
                    </button>
                </div>

                <h2>{selectedVehicle.nombre}</h2>
                <p>{selectedVehicle.descripcion[selectedLanguage]}</p>
                <div className="botones-lang">
                    <button
                    className="btn-lang"
                    onClick={() => changeLanguage("es")}
                    >
                    ES
                    </button>
                    <button
                    className="btn-lang"
                    onClick={() => changeLanguage("en")}
                    >
                    EN
                    </button>
                    <button
                    className="btn-lang"
                    onClick={() => changeLanguage("fr")}
                    >
                    FR
                    </button>
                </div>
                </div>
            </div>
            )}
        </div>
    </div>
  );
};