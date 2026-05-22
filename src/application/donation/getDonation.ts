import type { Donation } from "../../domain/donation/donation.type";
import { loadDonations } from "../../infrastructure/donation/donation.local";

export function getDonations(): Donation[] {
  return loadDonations();
}