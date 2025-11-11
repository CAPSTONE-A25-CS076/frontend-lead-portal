import { useEffect, useState } from "react";
import {
  JOBS,
  MARITALS,
  EDUCATIONS,
  CONTACTS,
  POUTCOMES,
} from "../utils/dummyData";

export default function LeadFilters({ value, onChange }) {
  const [local, setLocal] = useState(value);

  useEffect(() => setLocal(value), [value]);

  const set = (k, v) => {
    const next = { ...local, [k]: v };
    setLocal(next);
    onChange?.(next);
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Min Score</label>
        <input
          type="number"
          min={0}
          max={100}
          value={local.minScore}
          onChange={(e) => set("minScore", Number(e.target.value))}
          className="w-full rounded-lg border-gray-300"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Job</label>
        <select
          value={local.job}
          onChange={(e) => set("job", e.target.value)}
          className="w-full rounded-lg border-gray-300"
        >
          <option value="">All</option>
          {JOBS.map((j) => (
            <option key={j} value={j}>
              {j}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Marital</label>
        <select
          value={local.marital}
          onChange={(e) => set("marital", e.target.value)}
          className="w-full rounded-lg border-gray-300"
        >
          <option value="">All</option>
          {MARITALS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Has Housing Loan
        </label>
        <select
          value={local.housing}
          onChange={(e) => set("housing", e.target.value)}
          className="w-full rounded-lg border-gray-300"
        >
          <option value="">All</option>
          <option value="yes">yes</option>
          <option value="no">no</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Has Personal Loan
        </label>
        <select
          value={local.loan}
          onChange={(e) => set("loan", e.target.value)}
          className="w-full rounded-lg border-gray-300"
        >
          <option value="">All</option>
          <option value="yes">yes</option>
          <option value="no">no</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Month</label>
        <select
          value={local.month}
          onChange={(e) => set("month", e.target.value)}
          className="w-full rounded-lg border-gray-300"
        >
          <option value="">All</option>
          {[
            "jan",
            "feb",
            "mar",
            "apr",
            "may",
            "jun",
            "jul",
            "aug",
            "sep",
            "oct",
            "nov",
            "dec",
          ].map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <div className="md:col-span-2 lg:col-span-2">
        <label className="block text-sm font-medium mb-1">Search</label>
        <input
          type="text"
          value={local.q}
          onChange={(e) => set("q", e.target.value)}
          placeholder="Cari by job/education/outcome..."
          className="w-full rounded-lg border-gray-300"
        />
      </div>
    </div>
  );
}
