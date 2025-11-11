import { useEffect, useMemo, useState } from "react";
import LeadFilters from "../components/LeadFilters.jsx";
import LeadTable from "../components/LeadTable.jsx";
import Drawer from "../components/Drawer.jsx";
import ScoreBadge from "../components/ScoreBadge.jsx";
import { getLeads } from "../utils/api.js";

export default function Dashboard() {
  const [filters, setFilters] = useState({
    minScore: 60,
    job: "",
    marital: "",
    housing: "",
    loan: "",
    month: "",
    q: "",
  });
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getLeads();
      setRows(data);
    })();
  }, []);

  const filtered = useMemo(
    () =>
      rows
        .filter((r) => Math.round(r.score * 100) >= filters.minScore)
        .filter((r) => !filters.job || r.job === filters.job)
        .filter((r) => !filters.marital || r.marital === filters.marital)
        .filter((r) => !filters.housing || r.housing === filters.housing)
        .filter((r) => !filters.loan || r.loan === filters.loan)
        .filter((r) => !filters.month || r.month === filters.month)
        .filter((r) => {
          if (!filters.q) return true;
          const q = filters.q.toLowerCase();
          return [r.job, r.education, r.poutcome, r.contact].some((v) =>
            String(v).toLowerCase().includes(q)
          );
        })
        .sort((a, b) => b.score - a.score),
    [rows, filters]
  );
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>

      <LeadFilters value={filters} onChange={setFilters} />

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100 text-left text-sm">
            <tr>
              <th className="px-4 py-3">Rank</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">Age</th>
              <th className="px-4 py-3">Job</th>
              <th className="px-4 py-3">Marital</th>
              <th className="px-4 py-3">Housing</th>
              <th className="px-4 py-3">Loan</th>
              <th className="px-4 py-3">Month</th>
              <th className="px-4 py-3">Prev Outcome</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map((r, idx) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{idx + 1}</td>
                <td className="px-4 py-3">
                  <ScoreBadge score={r.score} />
                </td>
                <td className="px-4 py-3">{r.age}</td>
                <td className="px-4 py-3">{r.job}</td>
                <td className="px-4 py-3">{r.marital}</td>
                <td className="px-4 py-3">{r.housing}</td>
                <td className="px-4 py-3">{r.loan}</td>
                <td className="px-4 py-3">{r.month}</td>
                <td className="px-4 py-3">{r.poutcome}</td>
                <td className="px-4 py-3">
                  <button
                    className="text-sm font-medium text-indigo-700 hover:underline"
                    onClick={() => setSelected(r)}
                  >
                    Open
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Drawer open={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Lead #{selected.id}</h3>
              <ScoreBadge score={selected.score} />
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <Field k="Age" v={selected.age} />
              <Field k="Job" v={selected.job} />
              <Field k="Marital" v={selected.marital} />
              <Field k="Education" v={selected.education} />
              <Field k="Default" v={selected.default} />
              <Field k="Balance (€)" v={selected.balance} />
              <Field k="Housing" v={selected.housing} />
              <Field k="Loan" v={selected.loan} />
              <Field k="Contact" v={selected.contact} />
              <Field k="Day" v={selected.day} />
              <Field k="Month" v={selected.month} />
              <Field k="Duration (s)" v={selected.duration} />
              <Field k="Campaign" v={selected.campaign} />
              <Field k="Pdays" v={selected.pdays} />
              <Field k="Previous" v={selected.previous} />
              <Field k="Poutcome" v={selected.poutcome} />
              <Field k="Target (y)" v={selected.y} />
            </div>
            <button className="w-full py-2 rounded-xl bg-black text-white font-medium">
              Call Lead
            </button>
          </div>
        )}
      </Drawer>
    </div>
  );
}
function Field({ k, v }) {
  return (
    <div className="bg-gray-50 rounded-xl p-3">
      <div className="text-gray-500 text-xs">{k}</div>
      <div className="font-medium">{String(v)}</div>
    </div>
  );
}
