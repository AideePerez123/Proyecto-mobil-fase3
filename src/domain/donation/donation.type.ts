export type Donation = {
  id: number;
  nombre: string;
  monto: number;
  metodo: string;
  comprobante?: string;
  fecha: string;
};