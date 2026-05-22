import type { Reservation } from "../../domain/reservation/reservation.type";
import { loadReservationsByDate } from "../../infrastructure/reservation/reservation.indexddb";

export async function getReservationsByDate(fecha: string): Promise<Reservation[]> {
  return loadReservationsByDate(fecha);
}