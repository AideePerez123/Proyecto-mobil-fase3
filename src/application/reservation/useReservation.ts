import { useEffect, useState } from "react";
import type { Reservation } from "../../domain/reservation/reservation.type";
import { loadReservationsByDate } from "../../infrastructure/reservation/reservation.indexddb";

export function useReservations(fecha: string | null) {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const refresh = async () => {
    if (!fecha) {
      setReservations([]);
      return;
    }
    setIsLoading(true);
    const data = await loadReservationsByDate(fecha);
    setReservations(data);
    setIsLoading(false);
  };

  useEffect(() => {
    refresh();
  }, [fecha]);

  return { reservations, isLoading, refresh };
}