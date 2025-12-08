import { useMemo } from "react";

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

export function useLeadFilters(leads, filters, limit = null) {
  return useMemo(
    () => {
      let filtered = leads
        .filter((r) => Math.round(r.score * 100) >= filters.minScore)
        .filter((r) => !filters.job || r.job === filters.job)
        .filter((r) => !filters.marital || r.marital === filters.marital)
        .filter((r) => !filters.housing || r.housing === filters.housing)
        .filter((r) => !filters.loan || r.loan === filters.loan)
        .filter((r) => {
          const leadMonth = MONTHS.find(m => m.value === r.month);
          const leadMonthIndex = leadMonth ? leadMonth.index : 0;
          const fromMonth = MONTHS.find(m => m.value === filters.monthFrom);
          const fromIndex = fromMonth ? fromMonth.index : 0;
          const toMonth = MONTHS.find(m => m.value === filters.monthTo);
          const toIndex = toMonth ? toMonth.index : 13; // 13 to include dec if no to
          return (!filters.monthFrom || leadMonthIndex >= fromIndex) &&
                 (!filters.monthTo || leadMonthIndex <= toIndex);
        })
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
