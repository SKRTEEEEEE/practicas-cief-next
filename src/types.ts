export type Vehicle = {
  nombre: string;
  descripcion: {
    es: string;
    en: string;
    fr: string;
  };
  tipo: "moto"|"bicicleta";
  fianza: number;
  precio: number;
  fotos:  string[]
};