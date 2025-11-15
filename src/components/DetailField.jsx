export default function DetailField({ label, value }) {
  return (
    <div className="bg-gray-50 rounded-xl p-3">
      <div className="text-gray-500 text-xs">{label}</div>
      <div className="font-medium">{String(value)}</div>
    </div>
  );
}
