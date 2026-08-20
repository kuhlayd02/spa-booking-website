import Link from "next/link";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#3A4A2E] text-[#E8E4D5]">
      {/* Arch motif */}
      <div className="absolute -top-20 left-1/2 h-40 w-[560px] -translate-x-1/2 rounded-t-full bg-[#C4CDA8]/8" />

      <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-10">
        {/* Closing invitation */}
        <div className="border-b border-[#E8E4D5]/12 pb-14 text-center">
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#C4CDA8]">
            One hour, entirely yours
          </p>
          <h2 className="mx-auto mt-5 max-w-lg font-serif text-4xl leading-tight text-[#F5F1E6] sm:text-5xl">
            The room is quiet and the tea is already steeping
          </h2>
          <Link
            href="/booking"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#C68B3C] px-7 py-3.5 text-[10px] uppercase tracking-[0.2em] text-[#2A331F] transition-colors hover:bg-[#D89E4F]"
          >
            Reserve a time
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Details */}
        <div className="grid gap-10 py-14 sm:grid-cols-3">
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.22em] text-[#C4CDA8]">
              Visit
            </h3>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[#E8E4D5]/75">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#C4CDA8]" />
                2F Alcove Center
                <br />
                Calamba, Laguna
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] uppercase tracking-[0.22em] text-[#C4CDA8]">
              Reach us
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-[#E8E4D5]/75">
              <li>
                <a
                  href="tel:+63495550142"
                  className="flex gap-2.5 transition-colors hover:text-[#F5F1E6]"
                >
                  <Phone className="h-4 w-4 shrink-0 text-[#C4CDA8]" />
                  (049) 555 0142
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@lunaspa.ph"
                  className="flex gap-2.5 transition-colors hover:text-[#F5F1E6]"
                >
                  <Mail className="h-4 w-4 shrink-0 text-[#C4CDA8]" />
                  hello@lunaspa.ph
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] uppercase tracking-[0.22em] text-[#C4CDA8]">
              Hours
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-[#E8E4D5]/75">
              <li className="flex justify-between border-b border-[#E8E4D5]/10 pb-2">
                <span>Mon – Fri</span>
                <span className="text-[#F5F1E6]">9 AM – 7 PM</span>
              </li>
              <li className="flex justify-between border-b border-[#E8E4D5]/10 pb-2">
                <span>Sat – Sun</span>
                <span className="text-[#F5F1E6]">10 AM – 8 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Oversized wordmark */}
        <div className="border-t border-[#E8E4D5]/12 pt-10">
          <p
            className="select-none text-center font-serif text-[15vw] leading-[0.8] text-[#E8E4D5]/8 sm:text-[10rem]"
            aria-hidden="true"
          >
            Luna
          </p>
          <p className="mt-6 text-center text-[10px] uppercase tracking-[0.2em] text-[#E8E4D5]/45">
            © {new Date().getFullYear()} Luna Spa & Wellness · Calamba, Laguna
          </p>
        </div>
      </div>
    </footer>
  );
}