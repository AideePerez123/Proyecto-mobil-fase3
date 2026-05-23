import type { Donation } from "../../domain/donation/donation.type";
import { loadDonations, saveAllDonations } from "../../infrastructure/donation/donation.local";

export async function createDonation(
  nombre: string,
  monto: number,
  metodo: string,
  comprobante?: string
): Promise<Donation> {
  if (!nombre.trim()) throw new Error("Su nombre es obligatorio, o puede escribir anonimo");
  if (monto <= 0) throw new Error("El monto debe ser mayor a cero.");

  const newDonation: Donation = {
    id: Date.now(),
    nombre: nombre.trim(),
    monto,
    metodo,
    comprobante: comprobante?.trim() || undefined,
    fecha: "Justo ahora",
  };
  const current = loadDonations();
  const updated = [newDonation, ...current];
  saveAllDonations(updated);
  return newDonation;
}