"use client"
import {ContainerCards} from "../components/container-cards"
import { useState } from "react";
import Image from "next/image";
import imagenes from "../data/backgroundIMG.json";
import data from "../data/data.json"

const images = imagenes;
const motos = data.filter((item) => item.tipo === "moto");
const bicicletas = data.filter((item) => item.tipo === "bicicleta");

const whatsappNumber = "+34671222750";

function Vehicles() {
  const [slideIndex, setSlideIndex] = useState(1);
  const [show, setShow] = useState("motos"); // Estado para iniciar mostrando las motos
  //Recoje las fechas como un estado ℹ️
  const [dates, setDates] = useState({}); // Estado para armazenar datas por índice
  const itemsToShow = show === "motos" ? motos : bicicletas;
  const [currentImageIndexes, setCurrentImageIndexes] = useState(
    new Array(itemsToShow.length).fill(0)
  );

  const plusSlides = (n) => {
    let newIndex = slideIndex + n;
    if (newIndex > images.length) {
      newIndex = 1;
    } else if (newIndex < 1) {
      newIndex = images.length;
    }
    setSlideIndex(newIndex);
  };

  const currentSlide = (n) => setSlideIndex(n);
  const handleShowMotos = () => setShow("motos");
  const handleShowBicicletas = () => setShow("bicicletas");

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

  return (
    <>
      {/* Slideshow principal */}
      <div className="slideshow-container">
        {images.map((image, index) => (
          <div
            key={index}
            className={`mySlides fade ${
              slideIndex === index + 1 ? "active" : ""
            }`}
            style={{ display: slideIndex === index + 1 ? "block" : "none" }}
          >
            <Image
              className="img-head"
              src={image.src}
              width={3000}
              height={1000}
              alt={`Slide ${index + 1}`}
            />
            <div className="dots-container">
              {images.map((_, dotIndex) => (
                <span
                  key={dotIndex}
                  className={`dot ${
                    slideIndex === dotIndex + 1 ? "active" : ""
                  }`}
                  onClick={() => currentSlide(dotIndex + 1)}
                ></span>
              ))}
            </div>
          </div>
        ))}
        <a className="prev" onClick={() => plusSlides(-1)}>
          &#10094;
        </a>
        <a className="next" onClick={() => plusSlides(1)}>
          &#10095;
        </a>
      </div>

      {/* Vehiculos disponibles */}
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

        {/* Aqui van insertadas las cards con su container */}
        <ContainerCards
          whatsappNumber={whatsappNumber}
          itemsToShow={itemsToShow}
          dates={dates}
          currentImageIndexes={currentImageIndexes}
          handleNextPhoto={handleNextPhoto}
          handlePreviousPhoto={handlePreviousPhoto}
          handleFechaInicioChange={handleFechaInicioChange}
          handleFechaTerminoChange={handleFechaTerminoChange}
        />

      </div>
    </>
  );
}

export default Vehicles;
