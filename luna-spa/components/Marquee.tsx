const items = [
  "Warm towels",
  "Tea after every session",
  "Private suites only",
  "Licensed therapists",
  "Cold-pressed oils",
];

export default function Marquee() {
  const strip = [...items, ...items, ...items, ...items];

  return (
    <div className="overflow-hidden border-y border-[#1E2419]/10 bg-[#E5DCCB] py-3">
      <div className="animate-marquee flex w-max items-center gap-7 whitespace-nowrap">
        {strip.map((item, i) => (
          <span key={i} className="flex items-center gap-7">
            <span className="micro text-[#1E2419]/70">{item}</span>
            <span className="text-[#3A4A2E]/40">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}