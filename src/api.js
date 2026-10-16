const KEY = import.meta.env.VITE_GEOAPIFY_KEY;

export async function fetchPlaces({
  category = "tourism.attraction",
  lon = 80.2707,
  lat = 13.0827,
  radius = 20000,
  limit = 30,
} = {}) {
  const url = `https://api.geoapify.com/v2/places?categories=${category}&filter=circle:${lon},${lat},${radius}&bias=proximity:${lon},${lat}&limit=${limit}&apiKey=${KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  const data = await res.json();
  return data.features.map((f) => f.properties).filter((p) => p.name);
}