import type { Reservation } from "../../domain/reservation/reservation.type";
import { loadReservationsFromFirestore } from "../../infrastructure/reservation/reservation.firestore";

export async function getReservationsByDate(fecha: string): Promise<Reservation[]> {
  return loadReservationsFromFirestore(fecha);
}