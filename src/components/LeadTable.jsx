import { Link } from "react-router-dom";
import ScoreBadge from "./ScoreBadge.jsx";

export default function LeadTable({ rows }) {
  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-gray-100 text-left text-sm">
          <tr>
            <th className="px-4 py-3">Rank</th>
            <th className="px-4 py-3">Score</th>
            <th className="px-4 py-3">Age</th>
            <th className="px-4 py-3">Job</th>
            <th className="px-4 py-3">Marital</th>
            <th className="px-4 py-3">Education</th>
            <th className="px-4 py-3">Housing</th>
            <th className="px-4 py-3">Loan</th>
            <th className="px-4 py-3">Prev Outcome</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {rows.map((r, idx) => (
            <tr key={r.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">{idx + 1}</td>
              <td className="px-4 py-3">
                <ScoreBadge score={r.score} />
              </td>
              <td className="px-4 py-3">{r.age}</td>
              <td className="px-4 py-3">{r.job}</td>
              <td className="px-4 py-3">{r.marital}</td>
              <td className="px-4 py-3">{r.education}</td>
              <td className="px-4 py-3">{r.housing}</td>
              <td className="px-4 py-3">{r.loan}</td>
              <td className="px-4 py-3">{r.poutcome}</td>
              <td className="px-4 py-3">
                <Link
                  to={`/leads/${r.id}`}
                  className="text-sm font-medium text-indigo-700 hover:underline"
                >
                  Detail
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
