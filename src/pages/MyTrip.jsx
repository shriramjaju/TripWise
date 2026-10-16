import { Link } from "react-router-dom";
import { useTrip } from "../TripContext";

export default function MyTrip() {
  const { trip, removePlace } = useTrip();

  return (
    <>
      <header>
        <h1>My Trip</h1>
        <p>{trip.length} {trip.length === 1 ? "place" : "places"} saved</p>
      </header>

      {trip.length === 0 ? (
        <div className="message">
          <p>Your trip is empty. Go explore and add some places!</p>
          <Link className="btn" to="/">Explore places</Link>
        </div>
      ) : (
        <div className="grid">
          {trip.map((p) => (
            <div className="card" key={p.place_id}>
              <h3>{p.name}</h3>
              <p className="address">{p.formatted}</p>
              <div className="card-actions">
                <Link
                  className="btn secondary"
                  to={`/destination/${p.place_id}`}
                  state={{ place: p }}
                >
                  View details
                </Link>
                <button className="btn danger" onClick={() => removePlace(p.place_id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}