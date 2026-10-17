import { useEffect, useRef, useState } from "react";
import { fetchPhotos } from "./api";

export default function PlaceImage({ name }) {
  const ref = useRef(null);
  const [src, setSrc] = useState(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        fetchPhotos(name)
          .then((p) => setSrc(p[0] || null))
          .finally(() => setDone(true));
      },
      { rootMargin: "200px" }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [name]);

  return (
    <div ref={ref} className="thumb">
      {src ? <img src={src} alt={name} loading="lazy" /> : <span>{done ? "No photo" : ""}</span>}
    </div>
  );
}