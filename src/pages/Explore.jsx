
import PlaceImage from "../PlaceImage";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPlaces } from "../api";
import { useTrip } from "../TripContext";

const CATEGORIES = [
  { label: "Attractions", value: "tourism.attraction" },
  { label: "Museums", value: "entertainment.museum" },
  { label: "Beaches", value: "beach" },
  { label: "Parks", value: "leisure.park" },
  { label: "Temples & worship", value: "religion.place_of_worship" },
  { label: "Zoos", value: "entertainment.zoo" },
  { label: "Historic sites", value: "tourism.sights" },
  { label: "Restaurants", value: "catering.restaurant" },
  { label: "Cafes", value: "catering.cafe" },
  { label: "Shopping malls", value: "commercial.shopping_mall" },
  { label: "Lakes & nature", value: "natural.water" },
];

export default function Explore() {
  const { addPlace, removePlace, isInTrip } = useTrip();
  const [category, setCategory] = useState(CATEGORIES[0].value);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name-asc");
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError("");
    fetchPlaces({ category })
      .then(setPlaces)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [category, reload]);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = places.filter((p) => p.name.toLowerCase().includes(q));
    list.sort((a, b) => {
      if (sort === "name-asc") return a.name.localeCompare(b.name);
      if (sort === "name-desc") return b.name.localeCompare(a.name);
      return (a.distance ?? Infinity) - (b.distance ?? Infinity);
    });
    return list;
  }, [places, search, sort]);

  return (
    <>
      <header>
        <h1>Explore Hyderabad</h1>
        <p>Find places and add them to your trip</p>
      </header>

      <div className="controls">
        <input
          type="text"
          placeholder="Search places..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="name-asc">Name A-Z</option>
          <option value="name-desc">Name Z-A</option>
          <option value="distance">Nearest first</option>
        </select>
      </div>

      {loading && <p className="message">Loading places...</p>}

      {error && (
        <div className="message error">
          <p>Something went wrong: {error}</p>
          <button className="btn" onClick={() => setReload((n) => n + 1)}>Retry</button>
        </div>
      )}

      {!loading && !error && visible.length === 0 && (
        <p className="message">No results found. Try a different search or category.</p>
      )}

      <div className="grid">
        {!loading && !error && visible.map((p) => {
          const added = isInTrip(p.place_id);
          return (
            <div className="card" key={p.place_id}>
              <PlaceImage name={p.name} />
              <h3>{p.name}</h3>
              <p className="address">{p.formatted}</p>
              {p.distance != null && (
                <p className="distance">{(p.distance / 1000).toFixed(1)} km from centre</p>
              )}
              <div className="card-actions">
                <Link
                  className="btn secondary"
                  to={`/destination/${p.place_id}`}
                  state={{ place: p }}
                >
                  View details
                </Link>
                <button
                  className={added ? "btn added" : "btn"}
                  onClick={() => (added ? removePlace(p.place_id) : addPlace(p))}
                >
                  {added ? "Added ✓" : "Add to Trip"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}