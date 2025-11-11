export default function ScoreBadge({ score }) {
  const pct = Math.round(score * 100);
  const tone =
    pct >= 80
      ? "bg-emerald-100 text-emerald-700"
      : pct >= 60
      ? "bg-amber-100 text-amber-700"
      : "bg-gray-100 text-gray-700";
  return (
    <span
      className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${tone}`}
    >
      {pct}%
    </span>
  );
}
