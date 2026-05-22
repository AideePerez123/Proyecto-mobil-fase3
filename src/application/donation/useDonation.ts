import { useEffect, useState } from "react";
import type { Donation } from "../../domain/donation/donation.type";
import { loadDonations } from "../../infrastructure/donation/donation.local";

export function useDonations() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = () => {
    setDonations(loadDonations());
  };

  useEffect(() => {
    refresh();
    setIsLoading(false);
  }, []);

  return { donations, isLoading, refresh };
}