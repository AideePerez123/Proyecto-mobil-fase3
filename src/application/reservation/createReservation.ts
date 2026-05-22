import type { Reservation } from "../../domain/reservation/reservation.type";
import { saveReservation, loadReservationsByDate } from "../../infrastructure/reservation/reservation.indexddb";

export async function createReservation(
  fecha: string,
  horarioId: number,
  nombre: string,
  telefono: string
): Promise<void> {
  if (!nombre.trim()) throw new Error("El nombre es obligatorio.");
  if (!telefono.trim()) throw new Error("El teléfono es obligatorio.");

  const existing = await loadReservationsByDate(fecha);
  const alreadyReserved = existing.some(r => r.horarioId === horarioId);
  if (alreadyReserved) throw new Error("Este horario ya está reservado.");

  const reservation: Reservation = {
    id: `${fecha}-${horarioId}`,
    fecha,
    horarioId,
    nombre: nombre.trim(),
    telefono: telefono.trim(),
  };
  await saveReservation(reservation);
}