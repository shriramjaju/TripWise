import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchPlaceById, fetchWeather, fetchPhotos } from "../api";
import { useTrip } from "../TripContext";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { addPlace, removePlace, isInTrip } = useTrip();

  const [place, setPlace] = useState(state?.place ?? null);
  const [loading, setLoading] = useState(!state?.place);
  const [error, setError] = useState("");
  const [weather, setWeather] = useState(null);
  const [photos, setPhotos] = useState(null);

  // If the page was opened/refreshed directly, fetch the place by its id
  useEffect(() => {
    if (place) return;
    fetchPlaceById(id)
      .then((p) => setPlace({ ...p, place_id: id }))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id, place]);

  // Weather for the place's location
  useEffect(() => {
    if (!place?.lat) return;
    fetchWeather(place.lat, place.lon)
      .then(setWeather)
      .catch(() => setWeather(null));
  }, [place?.lat, place?.lon]);

  // Photos for the place
  useEffect(() => {
  if (!place?.name) return;
  fetchPhotos(place.name).then(setPhotos);
}, [place?.name]);

  if (loading) return <p className="message">Loading details...</p>;
  if (error)
    return (
      <div className="message error">
        <p>Could not load this place: {error}</p>
        <Link className="btn" to="/">Back to Explore</Link>
      </div>
    );
  if (!place) return null;

  const added = isInTrip(place.place_id);
  const mapUrl = `https://www.openstreetmap.org/?mlat=${place.lat}&mlon=${place.lon}#map=16/${place.lat}/${place.lon}`;

  return (
    <div className="details">
      <button
  className="back"
  onClick={() => (window.history.length > 1 ? navigate(-1) : navigate("/"))}
>
  ← Back to Explore
</button>
      <h1>{place.name}</h1>
      <p className="address">{place.formatted}</p>
      <div className="gallery">
  {photos === null && <p className="message">Loading photos...</p>}
  {photos?.length === 0 && <p className="message">No photos found for this place.</p>}
  {photos?.map((src) => (
    <img key={src} src={src} alt={place.name} loading="lazy" />
  ))}
</div>
      <div className="tags">
        {(place.categories || []).slice(0, 4).map((c) => (
          <span className="tag" key={c}>{c.replace(/\./g, " › ").replace(/_/g, " ")}</span>
        ))}
      </div>

      <div className="info">
        <p><strong>Coordinates:</strong> {Number(place.lat).toFixed(4)}, {Number(place.lon).toFixed(4)}</p>
        {place.distance != null && (
          <p><strong>Distance from centre:</strong> {(place.distance / 1000).toFixed(1)} km</p>
        )}
        {weather && (
          <p>
            <strong>Weather now:</strong> {weather.temperature_2m}°C,
            humidity {weather.relative_humidity_2m}%, wind {weather.wind_speed_10m} km/h
          </p>
        )}
      </div>

      <div className="card-actions">
        <a className="btn secondary" href={mapUrl} target="_blank" rel="noreferrer">
          View on map
        </a>
        <button
          className={added ? "btn added" : "btn"}
          onClick={() => (added ? removePlace(place.place_id) : addPlace(place))}
        >
          {added ? "Added ✓ (click to remove)" : "Add to Trip"}
        </button>
      </div>
    </div>
  );
}