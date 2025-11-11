import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ScoreBadge from "../components/ScoreBadge.jsx";
import { getLeadById } from "../utils/api.js";

export default function LeadDetail() {
  const { id } = useParams();
  const [lead, setLead] = useState(null);

  useEffect(() => {
    (async () => setLead(await getLeadById(Number(id))))();
  }, [id]);

  if (!lead) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Lead #{lead.id}</h1>
        <ScoreBadge score={lead.score} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(lead).map(
          ([k, v]) =>
            !["id", "score"].includes(k) && (
              <div key={k} className="bg-white rounded-2xl shadow p-4">
                <div className="text-xs text-gray-500">{k}</div>
                <div className="font-medium">{String(v)}</div>
              </div>
            )
        )}
      </div>

      <div className="flex gap-2">
        <button className="px-4 py-2 rounded-xl bg-black text-white">
          Call
        </button>
        <Link to="/dashboard" className="px-4 py-2 rounded-xl bg-gray-200">
          Back
        </Link>
      </div>
    </div>
  );
}
