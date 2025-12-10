import ScoreBadge from "./ScoreBadge";
import DetailField from "./DetailField";

export default function LeadDetailContent({ lead }) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Lead #{lead.id}</h3>
        <ScoreBadge score={lead.score} />
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <DetailField label="Age" value={lead.age} />
        <DetailField label="Job" value={lead.job} />
        <DetailField label="Marital" value={lead.marital} />
        <DetailField label="Education" value={lead.education} />
        <DetailField label="Default" value={lead.default} />
        {/* <DetailField label="Balance (€)" value={lead.balance} /> */}
        <DetailField label="Housing" value={lead.housing} />
        <DetailField label="Loan" value={lead.loan} />
        <DetailField label="Contact" value={lead.contact} />
        <DetailField label="Day" value={lead.day} />
        <DetailField label="Month" value={lead.month} />
        <DetailField label="Duration (s)" value={lead.duration} />
        <DetailField label="Campaign" value={lead.campaign} />
        <DetailField label="Pdays" value={lead.pdays} />
        <DetailField label="Previous" value={lead.previous} />
        <DetailField label="Poutcome" value={lead.poutcome} />
        <DetailField label="Target (y)" value={lead.y} />
      </div>

      {/* Action Button */}
      {/* <button className="w-full py-2 rounded-xl bg-black text-white font-medium hover:bg-gray-800 transition-colors">
        Call Lead
      </button> */}
    </div>
  );
}

