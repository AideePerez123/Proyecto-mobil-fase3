import type { Reservation } from "../../domain/reservation/reservation.type";
import { saveReservationToFirestore, loadReservationsFromFirestore } from "../../infrastructure/reservation/reservation.firestore";

export async function createReservation(
  fecha: string,
  horarioId: number,
  nombre: string,
  telefono: string
): Promise<void> {
  if (!nombre.trim()) throw new Error("El nombre es obligatorio.");
  if (!telefono.trim()) throw new Error("El teléfono es obligatorio.");

  const existing = await loadReservationsFromFirestore(fecha);
  const alreadyReserved = existing.some((r: Reservation) => r.horarioId === horarioId);
  if (alreadyReserved) throw new Error("Este horario ya está reservado.");

  const reservation: Reservation = {
    id: `${fecha}-${horarioId}`,
    fecha,
    horarioId,
    nombre: nombre.trim(),
    telefono: telefono.trim(),
  };
  await saveReservationToFirestore(reservation);
}