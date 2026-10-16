import { useEffect, useState } from "react";
import { fetchPlaces } from "./api";

export default function App() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPlaces()
      .then(setPlaces)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading places...</p>;
  if (error) return <p>Something went wrong: {error}</p>;
  if (places.length === 0) return <p>No results found.</p>;

  return (
    <div>
      <h1>TripWise</h1>
      {places.map((p) => (
        <div key={p.place_id}>
          <h3>{p.name}</h3>
          <p>{p.formatted}</p>
        </div>
      ))}
    </div>
  );
}