import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { peso, initials, serviceImage } from "@/lib/constants";
import Marquee from "@/components/Marquee";
import { ArrowUpRight, ArrowRight } from "lucide-react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [element: string]: any;
    }
  }
}

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [services, staff] = await Promise.all([
    prisma.service.findMany({ orderBy: { price: "asc" }, take: 5 }),
    prisma.staff.findMany({ take: 4 }),
  ]);

  const [feature, ...rest] = services;

  return (
    <>
      {/* Hero */}
      <section className="relative h-[92vh] min-h-[600px] w-full">
        <Image
          src="/images/hero.jpg"
          alt="A quiet spa treatment room"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E2419]/85 via-[#1E2419]/45 to-transparent" />

        <div className="relative mx-auto flex h-full max-w-6xl items-end px-6 pb-20">
          <div className="max-w-2xl">
            <p className="micro text-[#C7D49B]">Calamba · Laguna</p>
            <h1 className="mt-5 font-serif text-6xl leading-[0.95] tight text-[#EFEAE0] sm:text-8xl">
              An hour that
              <br />
              belongs to you
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[#EFEAE0]/80">
              Massage, facials and body therapy in a quiet room above the noise.
              Pick your therapist, pick a time, arrive to warm towels.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 rounded-full bg-[#C7D49B] px-7 py-3.5 micro text-[#1E2419] transition-colors hover:bg-[#D4DFAE]"
              >
                Book an appointment
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/services"
                className="rounded-full border border-[#EFEAE0]/35 px-7 py-3.5 micro text-[#EFEAE0] transition-colors hover:border-[#EFEAE0]"
              >
                See treatments
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      {/* Credential strip */}
      <section className="border-b border-[#1E2419]/10">
        <div className="mx-auto grid max-w-6xl gap-px bg-[#1E2419]/10 sm:grid-cols-4">
          {[
            ["Private suites", "No shared rooms, ever"],
            ["Licensed only", "Five years minimum"],
            ["Natural products", "Cold-pressed, local"],
            ["Instant booking", "Confirmed in seconds"],
          ].map(([title, sub]) => (
            <div key={title} className="bg-[#EFEAE0] px-6 py-8">
              <p className="micro text-[#3A4A2E]">{title}</p>
              <p className="mt-2 text-sm text-[#1E2419]/60">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bento treatments */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-md font-serif text-5xl leading-[1] tight sm:text-6xl">
            Where to begin
          </h2>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 micro text-[#3A4A2E]"
          >
            All treatments <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {/* Feature tile */}
          <Link
            href="/booking"
            className="group relative row-span-2 min-h-[440px] overflow-hidden rounded-[2rem]"
          >
            <Image
              src={serviceImage(feature.slug)}
              alt={feature.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E2419]/90 via-[#1E2419]/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8">
              <span className="rounded-full bg-[#C7D49B] px-3 py-1.5 micro text-[#1E2419]">
                {peso(feature.price)}
              </span>
              <h3 className="mt-4 font-serif text-4xl tight text-[#EFEAE0]">
                {feature.name}
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#EFEAE0]/75">
                {feature.description}
              </p>
            </div>
          </Link>

          {/* Small tiles */}
          <div className="grid gap-4 sm:grid-cols-2">
            {rest.map((s) => (
              <Link
                key={s.id}
                href="/booking"
                className="group relative min-h-[210px] overflow-hidden rounded-[1.5rem]"
              >
                <Image
                  src={serviceImage(s.slug)}
                  alt={s.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E2419]/85 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="micro text-[#C7D49B]">{peso(s.price)}</span>
                  <h3 className="mt-1.5 font-serif text-2xl tight text-[#EFEAE0]">
                    {s.name}
                  </h3>
                  <p className="micro mt-1 text-[#EFEAE0]/50">
                    {s.duration} min
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Split block */}
      <section className="bg-[#1E2419]">
        <div className="mx-auto grid max-w-6xl items-stretch gap-0 md:grid-cols-2">
          <div className="relative min-h-[360px] md:min-h-[520px]">
            <Image
              src="/images/room.jpg"
              alt="Inside a private treatment suite"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center px-8 py-16 sm:px-14">
            <p className="micro text-[#C7D49B]">This isn't a quick fix</p>
            <h2 className="mt-5 font-serif text-5xl leading-[1] tight text-[#EFEAE0]">
              You've been holding it in your shoulders
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-[#EFEAE0]/70">
              Most of our regulars come in for the first time after months of
              putting it off. They leave having booked the next one.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "Desk workers carrying neck and jaw tension",
                "Anyone recovering from long shifts on their feet",
                "First-timers who want to be talked through it",
                "People who just need a door that closes",
              ].map((t) => (
                <li
                  key={t}
                  className="flex gap-3 border-b border-[#EFEAE0]/10 pb-3 text-sm text-[#EFEAE0]/70"
                >
                  <span className="text-[#C7D49B]">—</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <p className="micro text-[#3A4A2E]">The team</p>
        <h2 className="mt-4 max-w-lg font-serif text-5xl leading-[1] tight sm:text-6xl">
          Four people, one very quiet floor
        </h2>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {staff.map((p) => (
            <div key={p.id}>
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#E5DCCB] font-serif text-3xl tight text-[#3A4A2E]">
                {initials(p.name)}
              </div>
              <h3 className="mt-5 font-serif text-2xl tight">{p.name}</h3>
              <p className="micro mt-1.5 text-[#3A4A2E]">{p.specialization}</p>
              <p className="mt-3 text-sm leading-relaxed text-[#1E2419]/60">
                {p.bio}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}