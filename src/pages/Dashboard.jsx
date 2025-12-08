import { useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import LeadFilters from "../components/LeadFilters";
import LeadTable from "../components/LeadTable";
import Drawer from "../components/Drawer";
import LeadDetailContent from "../components/LeadDetailContent";
import { useLeads } from "../hooks/useLeads";
import { useLeadFilters } from "../hooks/useLeadFilters";

export default function Dashboard() {
  const [filters, setFilters] = useState({
    minScore: 0,
    job: "",
    marital: "",
    housing: "",
    loan: "",
    monthFrom: "",
    monthTo: "",
    q: "",
  });
  const [selected, setSelected] = useState(null);
  const [showTopOnly, setShowTopOnly] = useState(true); // Default show top 10

  // Custom hooks
  const { leads, loading, error } = useLeads();
  const TOP_COUNT = 10;
  const filteredLeads = useLeadFilters(leads, filters, showTopOnly ? TOP_COUNT : null);
  const totalFilteredCount = useLeadFilters(leads, filters, null).length;

  // Handle filter change and reset to top 10
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setShowTopOnly(true); // Always show top 10 when filters change
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading leads...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-center text-red-600">
          <p className="font-semibold">Error loading leads</p>
          <p className="text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <DashboardHeader showTopOnly={showTopOnly} onToggleTop={setShowTopOnly} />
      
      <LeadFilters value={filters} onChange={handleFilterChange} />
      
      {/* Results Count */}
      <div className="flex items-center justify-between px-1">
        <div className="text-sm text-gray-600">
          Showing{" "}
          <span className="font-semibold text-gray-900">{filteredLeads.length}</span>
          {showTopOnly && totalFilteredCount > TOP_COUNT && (
            <span> of <span className="font-semibold text-gray-900">{totalFilteredCount}</span></span>
          )}
          {" "}leads
          {showTopOnly && (
            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              Top {TOP_COUNT} by Score
            </span>
          )}
        </div>
        
        {/* Show All Button (if in top mode and there are more results) */}
        {showTopOnly && totalFilteredCount > TOP_COUNT && (
          <button
            onClick={() => setShowTopOnly(false)}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
          >
            Show all {totalFilteredCount} leads
          </button>
        )}
      </div>
      
      <LeadTable leads={filteredLeads} onLeadSelect={setSelected} />
      
      <Drawer open={!!selected} onClose={() => setSelected(null)}>
        {selected && <LeadDetailContent lead={selected} />}
      </Drawer>
    </div>
  );
}