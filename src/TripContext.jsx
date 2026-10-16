import { createContext, useContext, useEffect, useState } from "react";

const TripContext = createContext();
const STORAGE_KEY = "tripwise-itinerary";

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export function TripProvider({ children }) {
  const [trip, setTrip] = useState(load);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trip));
  }, [trip]);

  const addPlace = (p) =>
    setTrip((prev) =>
      prev.some((x) => x.place_id === p.place_id)
        ? prev
        : [
            ...prev,
            {
              place_id: p.place_id,
              name: p.name,
              formatted: p.formatted,
              lat: p.lat,
              lon: p.lon,
              categories: p.categories,
            },
          ]
    );

  const removePlace = (id) => setTrip((prev) => prev.filter((x) => x.place_id !== id));
  const isInTrip = (id) => trip.some((x) => x.place_id === id);

  return (
    <TripContext.Provider value={{ trip, addPlace, removePlace, isInTrip }}>
      {children}
    </TripContext.Provider>
  );
}

export const useTrip = () => useContext(TripContext);