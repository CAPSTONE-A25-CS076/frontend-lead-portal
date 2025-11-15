import { useMemo } from "react";

export function useLeadFilters(leads, filters, limit = null) {
  return useMemo(
    () => {
      let filtered = leads
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
        .sort((a, b) => b.score - a.score);

      if (limit) {
        filtered = filtered.slice(0, limit);
      }

      return filtered;
    },
    [leads, filters, limit]
  );
}
