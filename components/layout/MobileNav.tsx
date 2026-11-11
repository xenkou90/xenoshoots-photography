"use client";

import { useRef } from "react";
import NavLink from "./NavLink";
import { primaryNav, secondaryNav } from "@/data/navigation";
import { siteCredit } from "@/data/site";

const navItems = [...primaryNav, ...secondaryNav];

const linkClasses =
    "font-serif text-nav tracking-[1px] transition-[letter-spacing] hover:tracking-[3px] focus-visible:tracking-[3px]";

export default function MobileNav() {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const openMenu = () => dialogRef.current?.showModal();
    const closeMenu = () => dialogRef.current?.close();

    return (
        <>
            <header className="flex items-center bg-brand px-4 py-3 md:hidden">
                <button
                    type="button"
                    aria-label="Open menu"
                    aria-haspopup="dialog"
                    onClick={openMenu}
                    className="-m-2 flex flex-col gap-1.25 p-3"
                >
                    <span className="block h-0.75 w-6 bg-white" />
                    <span className="block h-0.75 w-6 bg-white" />
                    <span className="block h-0.75 w-6 bg-white" />
                </button>
                <p className="ml-auto text-right font-serif text-[0.65rem] text-white/70">
                    {siteCredit}
                </p>
            </header>

            <dialog
                ref={dialogRef}
                aria-label="Menu"
                className="m-0 h-dvh max-h-none w-full max-w-none bg-brand p-0 text-white"
            >
                <button
                    type="button"
                    aria-label="Close menu"
                    onClick={closeMenu}
                    className="absolute top-3.75 right-5 text-[40px] leading-none font-light"
                >
                    <span aria-hidden="true">&times;</span>
                </button>

                <nav aria-label="Main" className="flex h-full items-center justify-center">
                    <ul className="flex flex-col items-center gap-7">
                        {navItems.map((item) => (
                            <li key={item.label}>
                                <NavLink item ={item} className={linkClasses} onClick={closeMenu} />
                            </li>
                        ))}
                    </ul>
                </nav>
            </dialog>
        </>
    );
}
