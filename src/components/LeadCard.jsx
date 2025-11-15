import ScoreBadge from "./ScoreBadge";

export default function LeadCard({ lead, index, onOpen }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full text-sm font-semibold text-gray-700">
            #{index + 1}
          </span>
          <ScoreBadge score={lead.score} />
        </div>
        <button
          onClick={() => onOpen(lead)}
          className="px-4 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Open
        </button>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <InfoItem label="Age" value={lead.age} />
        <InfoItem label="Job" value={lead.job} />
        <InfoItem label="Marital" value={lead.marital} />
        <InfoItem label="Housing" value={lead.housing} />
        <InfoItem label="Loan" value={lead.loan} />
        <InfoItem label="Month" value={lead.month} />
        <InfoItem label="Prev Outcome" value={lead.poutcome} className="col-span-2" />
      </div>
    </div>
  );
}

function InfoItem({ label, value, className = "" }) {
  return (
    <div className={className}>
      <div className="text-gray-500 text-xs mb-0.5">{label}</div>
      <div className="font-medium text-gray-900 truncate">{value}</div>
    </div>
  );
}
