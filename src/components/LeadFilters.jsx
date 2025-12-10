import { Search, Filter } from "lucide-react";
import { useState } from "react";

const MONTHS = [
  { value: "jan", label: "January", index: 1 },
  { value: "feb", label: "February", index: 2 },
  { value: "mar", label: "March", index: 3 },
  { value: "apr", label: "April", index: 4 },
  { value: "may", label: "May", index: 5 },
  { value: "jun", label: "June", index: 6 },
  { value: "jul", label: "July", index: 7 },
  { value: "aug", label: "August", index: 8 },
  { value: "sep", label: "September", index: 9 },
  { value: "oct", label: "October", index: 10 },
  { value: "nov", label: "November", index: 11 },
  { value: "dec", label: "December", index: 12 },
];

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
      monthFrom: "",
      monthTo: "",
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
        {/* Score Slider - Optional */}
        {/* {value.minScore > 0 && ( */}
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
        {/* )} */}

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          <FilterSelect
            label="Job"
            value={value.job}
            onChange={(val) => update("job", val)}
            options={["admin.", "technician", "services", "management", "retired", "blue-collar", "unemployed", "entrepreneur", "housemaid", "self-employed", "student"]}
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
          
          {/* Month Range - Combined */}
          <MonthRangeSelect
            label="Month Range"
            monthFrom={value.monthFrom}
            monthTo={value.monthTo}
            onChangeFrom={(val) => update("monthFrom", val)}
            onChangeTo={(val) => update("monthTo", val)}
          />

          {/* Clear Filters Button */}
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
          >
            Clear All
          </button>
        </div>

        {/* Month Range Display */}
        {(value.monthFrom || value.monthTo) && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">Month range:</span>
            <span className="font-medium text-indigo-600">
              {value.monthFrom ? MONTHS.find(m => m.value === value.monthFrom)?.label : "All"}
              {" → "}
              {value.monthTo ? MONTHS.find(m => m.value === value.monthTo)?.label : "All"}
            </span>
          </div>
        )}
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

function MonthSelect({ label, value, onChange }) {
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
        {MONTHS.map((month) => (
          <option key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function MonthRangeSelect({ label, monthFrom, monthTo, onChangeFrom, onChangeTo }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <select
          value={monthFrom}
          onChange={(e) => onChangeFrom(e.target.value)}
          className="flex-1 px-3 py-2 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all bg-white text-sm"
        >
          <option value="">From</option>
          {MONTHS.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label.slice(0, 3)}
            </option>
          ))}
        </select>
        <span className="text-gray-400 font-medium">→</span>
        <select
          value={monthTo}
          onChange={(e) => onChangeTo(e.target.value)}
          className="flex-1 px-3 py-2 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all bg-white text-sm"
        >
          <option value="">To</option>
          {MONTHS.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label.slice(0, 3)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}