"use client"

// Archivo: components/VehicleCard.tsx

import { useState } from "react";
import Image from "next/image";
import { Vehicle } from "@/types"; // Asegúrate de que este path sea correcto
import styles from "../../public/css/popup.module.css"; // Utiliza CSS Modules o importa desde `globals.css`
const formatDate = (dateString:string) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };
type Lenguajes = "es"|"en"|"fr"
export const VehicleCard = ({
  itemsToShow,
  dates,
  currentImageIndexes,
  handleNextPhoto,
  handlePreviousPhoto,
  handleFechaInicioChange,
  handleFechaTerminoChange,
}: {
  itemsToShow: Vehicle[];
  dates: { [key: string]: string };
  currentImageIndexes: number[];
  handleNextPhoto: (index: number, photos: string[]) => void;
  handlePreviousPhoto: (index: number, photos: string[]) => void;
  handleFechaInicioChange: (index: number, value: string) => void;
  handleFechaTerminoChange: (index: number, value: string) => void;
}) => {
  const whatsappNumber = "+34671222750";

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Lenguajes>("es");
  const [numeroFoto, setNumeroFoto] = useState(1);

  const handleCardClick = (vehicle: Vehicle) => setSelectedVehicle(vehicle);
  const closePopup = () => setSelectedVehicle(null);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const fotoChange = (val: number) => {
    const totalFotos = Object.keys(selectedVehicle?.foto || {}).length;
  
    if (val < totalFotos) {
      // Convertimos 'val' a string para acceder al objeto 'foto'
      return selectedVehicle?.foto[val.toString()] ? val + 1 : 1;
    } else {
      return 1;
    }
  };
  

  return (
    <>
      <div className={styles.container}>
        {itemsToShow.map((item, index) => {
          const photos = Object.values(item.foto);
          const mensajeWhatsapp = `Hola, me gustaría saber más sobre el ${item.nombre}.
          Fecha de inicio: ${formatDate(dates[`start-${index}`]) || ""}
          Fecha de término: ${formatDate(dates[`end-${index}`]) || ""}`;

          return (
            <div className={styles.card} key={index}>
              <div className={styles.imageContainer}>
                <Image
                  className={styles.imgDisp}
                  src={`${photos[currentImageIndexes[index]]}`}
                  alt={item.nombre}
                  width={300} // Proporciona un ancho
                  height={200} // Proporciona un alto
                />
                {photos.length > 1 && (
                  <div className={styles.imageControls}>
                    <button
                      onClick={() => handlePreviousPhoto(index, photos)}
                      className={styles.btnControl}
                    >
                      &#10094;
                    </button>
                    <button
                      onClick={() => handleNextPhoto(index, photos)}
                      className={styles.btnControl}
                    >
                      &#10095;
                    </button>
                  </div>
                )}
              </div>
              <div className={styles.infoCard}>
                <h3 className={styles.h3Disp}>{item.nombre}</h3>

                <div className={styles.fechaContainer}>
                  <label htmlFor={`fechaInicio-${index}`}>Fecha de inicio:</label>
                  <input
                    type="date"
                    id={`fechaInicio-${index}`}
                    value={dates[`start-${index}`] || ""}
                    onChange={(e) => {
                      const fechaInicio = e.target.value;
                      handleFechaInicioChange(index, fechaInicio);
                      (document.getElementById(
                        `fechaTermino-${index}`
                      ) as HTMLInputElement).min = fechaInicio;
                    }}
                    required
                    min={getCurrentDate()}
                  />
                  <label htmlFor={`fechaTermino-${index}`}>
                    Fecha de término:
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

                <p className={styles.priceDisp}>Fianza: {item.fianza} €</p>
                <p className={styles.priceDisp}>Precio: {item.precio} €</p>
              </div>

              <div className={styles.buttonContainer}>
                <a
                  className={styles.btnDisp}
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                    mensajeWhatsapp
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Reservar{" "}
                  <Image
                    className={styles.iconoWsp}
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2044px-WhatsApp.svg.png"
                    alt="icono whatsapp"
                    width={20}
                    height={20}
                  />
                </a>
                <button
                  className={styles.btnDisp}
                  onClick={() => handleCardClick(item)}
                >
                  Detalles
                </button>
              </div>
            </div>
          );
        })}

        {/* Popup for selected vehicle */}
        {selectedVehicle && (
          <div className={styles.popup}>
            <div className={styles.popupContent}>
              <span className={styles.closeBtn} onClick={closePopup}>
                X
              </span>
              <div className={styles.controlImagePopup}>
                <button
                  onClick={() => setNumeroFoto(fotoChange(numeroFoto))}
                  className={styles.popupBtnControl}
                >
                  &#10094;
                </button>

                <Image
                  src={`${selectedVehicle.foto[numeroFoto]}`}
                  alt={selectedVehicle.nombre}
                  width={400}
                  height={300}
                  className={styles.popupImage}
                />

                <button
                  onClick={() => setNumeroFoto(fotoChange(numeroFoto))}
                  className={styles.popupBtnControl}
                >
                  &#10095;
                </button>
              </div>

              <h2>{selectedVehicle.nombre}</h2>
              <p>{selectedVehicle.descripcion[selectedLanguage]}</p>
              <div className={styles.botonesLang}>
                <button className={styles.btnLang} onClick={() => setSelectedLanguage("es")}>
                  ES
                </button>
                <button className={styles.btnLang} onClick={() => setSelectedLanguage("en")}>
                  EN
                </button>
                <button className={styles.btnLang} onClick={() => setSelectedLanguage("fr")}>
                  FR
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
