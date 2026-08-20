"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Treatments" },
  { href: "/booking", label: "Book" },
  { href: "/admin", label: "Admin" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-5">
      <nav
        className={`mx-auto flex max-w-4xl items-center justify-between rounded-full px-5 py-2.5 transition-all duration-300 ${
          scrolled
            ? "bg-[#1E2419]/92 backdrop-blur-md shadow-lg shadow-black/10"
            : "bg-[#1E2419]/70 backdrop-blur-sm"
        }`}
      >
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-serif text-2xl leading-none tight text-[#EFEAE0]">
            Luna
          </span>
          <span className="hidden micro text-[#C7D49B] sm:block">Spa</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="micro text-[#EFEAE0]/65 transition-colors hover:text-[#C7D49B]"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/booking"
            className="rounded-full bg-[#C7D49B] px-4 py-2 micro text-[#1E2419] transition-colors hover:bg-[#D4DFAE]"
          >
            Book
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? (
              <X className="h-5 w-5 text-[#EFEAE0]" />
            ) : (
              <Menu className="h-5 w-5 text-[#EFEAE0]" />
            )}
          </button>
        </div>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-4xl rounded-3xl bg-[#1E2419]/95 px-6 py-3 backdrop-blur-md md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-[#EFEAE0]/10 py-3.5 micro text-[#EFEAE0]/80 last:border-0"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}