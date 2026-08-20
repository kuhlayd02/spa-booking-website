import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { peso } from "@/lib/constants";
import { Clock } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { price: "asc" } });

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <p className="text-xs uppercase tracking-[0.3em] text-emerald-800">
        Menu
      </p>
      <h1 className="mt-3 font-serif text-5xl text-stone-900">Treatments</h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-stone-600">
        Every session includes a short consultation, warm towels, and tea
        afterwards. Prices are per person.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {services.map((s) => (
          <div
            key={s.id}
            className="flex flex-col rounded-2xl border border-stone-200 bg-white p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="font-serif text-3xl text-stone-900">{s.name}</h2>
              <span className="whitespace-nowrap font-serif text-2xl text-emerald-900">
                {peso(s.price)}
              </span>
            </div>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-stone-600">
              {s.description}
            </p>
            <div className="mt-6 flex items-center justify-between border-t border-stone-100 pt-5">
              <span className="flex items-center gap-1.5 text-xs text-stone-500">
                <Clock className="h-3.5 w-3.5" /> {s.duration} minutes
              </span>
              <Link
                href="/booking"
                className="rounded-full bg-emerald-900 px-5 py-2 text-xs text-white transition-colors hover:bg-emerald-800"
              >
                Book this
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}