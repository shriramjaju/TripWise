const KEY = import.meta.env.VITE_GEOAPIFY_KEY;

export async function fetchPlaces({
  category = "tourism.attraction",
  lon = 78.4867,
  lat = 17.385,
  radius = 25000,
  limit = 60,
} = {}) {
  const url = `https://api.geoapify.com/v2/places?categories=${category}&filter=circle:${lon},${lat},${radius}&bias=proximity:${lon},${lat}&limit=${limit}&apiKey=${KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  const data = await res.json();
  return data.features.map((f) => f.properties).filter((p) => p.name);
}

export async function fetchPlaceById(id) {
  const res = await fetch(
    `https://api.geoapify.com/v2/place-details?id=${id}&apiKey=${KEY}`
  );
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  const data = await res.json();
  const f = data.features?.find((x) => x.properties.name) ?? data.features?.[0];
  if (!f) throw new Error("Place not found");
  return f.properties;
}

export async function fetchWeather(lat, lon) {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,relative_humidity_2m`
  );
  if (!res.ok) throw new Error("Weather unavailable");
  const data = await res.json();
  return data.current;
}
