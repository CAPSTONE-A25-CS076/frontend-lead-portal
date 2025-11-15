import { Search, Filter } from "lucide-react";
import { useState } from "react";

export default function LeadFilters({ value, onChange }) {
  const [showFilters, setShowFilters] = useState(false);

  const update = (key, val) => onChange({ ...value, [key]: val });

  const clearFilters = () => {
    onChange({
      minScore: 0,
      job: "",
      marital: "",
      housing: "",
      loan: "",
      month: "",
      q: "",
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4 md:p-6 space-y-4">
      {/* Search Bar & Toggle Button */}
      <div className="flex gap-3">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={value.q}
            onChange={(e) => update("q", e.target.value)}
            placeholder="Search by job, education, outcome..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
          />
        </div>

        {/* Filter Toggle Button (Mobile) */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
        >
          <Filter className="w-5 h-5" />
          <span className="font-medium">Filters</span>
        </button>
      </div>

      {/* Filters Grid */}
      <div className={`${showFilters ? 'block' : 'hidden'} md:block space-y-4`}>
        {/* Score Slider */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Min Score: {value.minScore}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={value.minScore}
            onChange={(e) => update("minScore", Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          <FilterSelect
            label="Job"
            value={value.job}
            onChange={(val) => update("job", val)}
            options={["admin", "technician", "services", "management", "retired", "blue-collar", "unemployed", "entrepreneur", "housemaid", "self-employed", "student"]}
          />
          
          <FilterSelect
            label="Marital"
            value={value.marital}
            onChange={(val) => update("marital", val)}
            options={["married", "single", "divorced"]}
          />
          
          <FilterSelect
            label="Housing"
            value={value.housing}
            onChange={(val) => update("housing", val)}
            options={["yes", "no"]}
          />
          
          <FilterSelect
            label="Loan"
            value={value.loan}
            onChange={(val) => update("loan", val)}
            options={["yes", "no"]}
          />
          
          <FilterSelect
            label="Month"
            value={value.month}
            onChange={(val) => update("month", val)}
            options={["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]}
          />

          {/* Clear Filters Button */}
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all bg-white"
      >
        <option value="">All</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}