// export type Vehicle = {
//   nombre: string;
//   descripcion: {
//     es: string;
//     en: string;
//     fr: string;
//   };
//   tipo: "moto"|"bicicleta";
//   fianza: number;
//   precio: number;
//   fotos:  string[]
// };

export type Vehicle = {
  nombre: string;
  descripcion: 
  {
    es: string;
    en: string;
    fr: string;
  
  };
  tipo: string;
  fianza: number;
  precio: number;
  foto: {
    [key: string]: string; // Esto permite cualquier clave de tipo string
  }

}
