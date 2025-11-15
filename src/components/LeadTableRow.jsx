import ScoreBadge from "./ScoreBadge";

export default function LeadTableRow({ lead, index, onOpen }) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-3">{index + 1}</td>
      <td className="px-4 py-3">
        <ScoreBadge score={lead.score} />
      </td>
      <td className="px-4 py-3">{lead.age}</td>
      <td className="px-4 py-3">{lead.job}</td>
      <td className="px-4 py-3">{lead.marital}</td>
      <td className="px-4 py-3">{lead.housing}</td>
      <td className="px-4 py-3">{lead.loan}</td>
      <td className="px-4 py-3">{lead.month}</td>
      <td className="px-4 py-3">{lead.poutcome}</td>
      <td className="px-4 py-3">
        <button
          className="text-sm font-medium text-indigo-700 hover:underline"
          onClick={() => onOpen(lead)}
        >
          Open
        </button>
      </td>
    </tr>
  );
}
