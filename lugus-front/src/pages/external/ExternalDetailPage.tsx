import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchWithAuth } from "../../api/fetchWithAuth";
 const API_URL = import.meta.env.VITE_API_URL;  
type ExternalData = {
  title: string;
  poster?: string;
  startYear?: string;
  type?: string;
  runtimeMinutes?: string;
  genres?: string;
  rating?: string;
  votes?: number;
  director?: string;
  actors?: string;
  plot?: string;
};

export default function ExternalDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState<ExternalData | null>(null);

  useEffect(() => {
    fetchWithAuth(`${API_URL}/v1/api/external/${id}`)
      .then(r => r.json())
      .then(setData);
  }, [id]);

  if (!data) return <div>Cargando…</div>;

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-3xl font-bold text-[#d4af37]">
        {data.title}
      </h1>

      <div className="flex gap-6">

        {data.poster && (
          <img
            src={data.poster}
            alt={data.title}
            className="w-48 rounded shadow"
          />
        )}

        <div className="space-y-2 text-sm">

          <p><strong>Año:</strong> {data.startYear}</p>
          <p><strong>Tipo:</strong> {data.type}</p>
          <p><strong>Duración:</strong> {data.runtimeMinutes} min</p>
          <p><strong>Géneros:</strong> {data.genres}</p>

          {data.rating && (
            <p><strong>Rating IMDb:</strong> {data.rating} ({data.votes} votos)</p>
          )}

          {data.director && (
            <p><strong>Director:</strong> {data.director}</p>
          )}

          {data.actors && (
            <p><strong>Reparto:</strong> {data.actors}</p>
          )}
        </div>
      </div>

      {data.plot && (
        <div className="bg-[#111] p-4 rounded border border-[#333]">
          <h2 className="text-xl text-[#d4af37] mb-2">Sinopsis</h2>
          <p className="leading-relaxed">{data.plot}</p>
        </div>
      )}

    </div>
  );
}
