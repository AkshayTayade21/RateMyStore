export default function OwnerStatCard({
  title,
  value,
  icon,
  borderClass,
  bgClass,
  hoverClass,
  textClass,
  labelClass,
  description,
}) {
  return (
    <div
      className={`rounded-2xl border ${borderClass} ${bgClass} backdrop-blur-md p-6 shadow-lg transition-all duration-300 hover:scale-105 ${hoverClass}`}
    >
      <p className={`text-sm mb-2 font-medium ${labelClass}`}>{title}</p>

      <div className="flex items-center gap-3">
        <span className="text-4xl">{icon}</span>
        <h2 className={`text-4xl font-bold ${textClass}`}>{value}</h2>
      </div>

      <p className={`mt-3 text-sm ${labelClass}`}>{description}</p>
    </div>
  );
}