import type { Reservation } from "../../domain/reservation/reservation.type";

const DB_NAME = "ComtrinDB";
const STORE_NAME = "reservas";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 2);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
        store.createIndex("fecha", "fecha", { unique: false });
      } else {
        const transaction = (event.target as IDBOpenDBRequest).transaction;
        if (transaction) {
          const store = transaction.objectStore(STORE_NAME);
          if (!store.indexNames.contains("fecha")) {
            store.createIndex("fecha", "fecha", { unique: false });
          }
        }
      }
    };
  });
}

export async function saveReservation(reservation: Reservation): Promise<void> {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  store.put(reservation);
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function loadReservationsByDate(fecha: string): Promise<Reservation[]> {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  const index = store.index("fecha");
  return new Promise((resolve, reject) => {
    const request = index.getAll(IDBKeyRange.only(fecha));
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}