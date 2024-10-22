import data from "../../data.json";
import imagenes from "../../backgroundIMG.json";

const images = imagenes;
const motos = data.filter((item) => item.tipo === "moto");
const bicicletas = data.filter((item) => item.tipo === "bicicleta");

export {images, motos, bicicletas}