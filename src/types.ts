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
 foto:  Record<string, string>;
};