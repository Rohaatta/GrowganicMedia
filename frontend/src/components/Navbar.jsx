import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "../lib/icons";
import { siteConfig } from "../lib/config";
import Button from "../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faBars } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png";


export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav-animate group sticky top-4 z-50 px-4">
      <div className="relative mx-auto w-fit">
        {/* Hover glow — invisible by default, fades in behind the whole pill on hover */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-6 -inset-y-6 -z-10 rounded-full bg-sprout/0 opacity-0 blur-2xl transition-all duration-100 group-hover:bg-sprout/35 group-hover:opacity-40"
        />
        <div className="relative flex items-center justify-between gap-3 rounded-full border border-white/10 bg-[#0b0b0d]/90 px-4 py-2.5 shadow-lg shadow-black/30 backdrop-blur-md">
          {/* Logo */}
         <Link
  to="/"
  className="flex items-center justify-center"
  onClick={() => setOpen(false)}
>
  <img src={logo} alt="Growganic logo" className="h-7 w-auto" />
</Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-2 md:flex">
            {siteConfig.nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Book a call button (desktop) */}
          <div className="hidden md:block">
            <a
        href="https://calendly.com/growganicmediallc/30min"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-[#765eff] px-5 py-2 font-regular text-white transition hover:bg-gray-400"
      >
        Book a call 
      </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="text-white md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <FontAwesomeIcon
              icon={open ? faXmark : faBars}
              style={{ color: "rgb(255, 255, 255)" }}
              size="lg"
            />
          </button>
        </div>
      </div>

      {/* Mobile full-screen overlay menu */}
      {open && (
        <div className="fixed inset-x-0 top-0 z-[20] flex flex-col rounded-b-3xl bg-[#0b0b0d] px-3 py-3 pb-6 shadow-xl md:hidden">
          {/* Top row: logo + close */}
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5"
              onClick={() => setOpen(false)}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round">
                <path d="M7 7c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4 1.8-4 4 1.8 4 4 4 4-1.8 4-4" />
              </svg>
            </Link>
            <button
              className="text-white"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <FontAwesomeIcon icon={faXmark} style={{ color: "rgb(255, 255, 255)" }} size="lg" />
            </button>
          </div>

          {/* Nav items */}
          <nav className="mt-8 flex flex-col gap-3">
            {siteConfig.nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-lg font-regular text-white"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Book a call button */}
          <a
        href="https://calendly.com/growganicmediallc/30min"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-[#765eff] px-6 py-3 font-semibold text-white transition hover:bg-gray-400"
      >
        Book a call
      </a>
        </div>
      )}
    </header>
  );
}