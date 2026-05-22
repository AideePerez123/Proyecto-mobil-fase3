import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import type { Reservation } from "../../domain/reservation/reservation.type";

const COLLECTION = "reservations";

export async function saveReservationToFirestore(reservation: Reservation): Promise<void> {
    await addDoc(collection(db, COLLECTION), {
        id: reservation.id,
        fecha: reservation.fecha,
        horarioId: reservation.horarioId,
        nombre: reservation.nombre,
        telefono: reservation.telefono,
        createdAt: new Date()
    });
}

export async function loadReservationsFromFirestore(fecha: string): Promise<Reservation[]> {
    const q = query(collection(db, COLLECTION), where("fecha", "==", fecha));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
        id: data.id,
        fecha: data.fecha,
        horarioId: data.horarioId,
        nombre: data.nombre,
        telefono: data.telefono
        };
    });
}