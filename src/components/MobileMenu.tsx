"use client";

import { useState } from "react";
import Link from "next/link";

type LinkItem = { href: string; label: string };

export function MobileMenu({
  serviceLinks,
  navLinks,
}: {
  serviceLinks: LinkItem[];
  navLinks: LinkItem[];
}) {
  const [open, setOpen] = useState(false);
  const [uslugeOpen, setUslugeOpen] = useState(false);

  const shopLink = navLinks.find((link) => link.href === "/shop");
  const restLinks = navLinks.filter((link) => link.href !== "/shop");

  function closeAll() {
    setOpen(false);
    setUslugeOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Zatvori meni" : "Otvori meni"}
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-navy md:hidden"
      >
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full border-b border-black/5 bg-white shadow-lg md:hidden">
          <nav className="flex max-h-[70vh] flex-col divide-y divide-black/5 overflow-y-auto px-6 py-2">
            <Link href="/" onClick={closeAll} className="py-3 font-medium text-navy">
              Početna
            </Link>

            <div className="py-1">
              <button
                type="button"
                onClick={() => setUslugeOpen((v) => !v)}
                className="flex w-full items-center justify-between py-2 font-medium text-navy"
              >
                Usluge
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`h-4 w-4 text-muted transition ${uslugeOpen ? "rotate-180" : ""}`}
                >
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.084l3.71-3.855a.75.75 0 111.08 1.04l-4.25 4.417a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </button>
              {uslugeOpen && (
                <div className="flex flex-col gap-3 pb-2 pl-3 pt-1">
                  {serviceLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeAll}
                      className="text-sm text-navy"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {shopLink && (
              <Link href={shopLink.href} onClick={closeAll} className="py-3 font-medium text-navy">
                {shopLink.label}
              </Link>
            )}

            {restLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeAll}
                className="py-3 font-medium text-navy"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
