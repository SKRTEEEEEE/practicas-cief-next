export type Vehicle = {
  nombre: string;
  descripcion: {
    es: string;
    en: string;
    fr: string;
  };
  tipo: string;
  fianza: number;
  precio: number;
  foto: {
    1: string;
    2: string;
  };
}
