import type { Donation } from "../../domain/donation/donation.type";

const STORAGE_KEY = "donaciones-comtrin";

export function loadDonations(): Donation[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveDonation(donation: Donation): void {
  const donations = loadDonations();
  donations.unshift(donation);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(donations));
}

export function saveAllDonations(donations: Donation[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(donations));
}