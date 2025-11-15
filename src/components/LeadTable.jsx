import LeadTableHeader from "./LeadTableHeader";
import LeadTableRow from "./LeadTableRow";
import LeadCard from "./LeadCard";

export default function LeadTable({ leads, onLeadSelect }) {
  return (
    <>
      {/* Desktop View - Table */}
      <div className="hidden md:block bg-white rounded-2xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <LeadTableHeader />
            <tbody className="divide-y">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan="10" className="px-4 py-8 text-center text-gray-500">
                    No leads found
                  </td>
                </tr>
              ) : (
                leads.map((lead, idx) => (
                  <LeadTableRow
                    key={lead.id}
                    lead={lead}
                    index={idx}
                    onOpen={onLeadSelect}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile View - Cards */}
      <div className="md:hidden space-y-3">
        {leads.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center text-gray-500">
            No leads found
          </div>
        ) : (
          leads.map((lead, idx) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              index={idx}
              onOpen={onLeadSelect}
            />
          ))
        )}
      </div>
    </>
  );
}
