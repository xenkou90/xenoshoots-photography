import NavLink from "./NavLink";
import { primaryNav, secondaryNav } from "@/data/navigation";

const linkClasses =
    "block w-full text-left font-serif text-[1.75rem] wide:text-[1.9rem] tracking-[1px] py-1.25";

export default function Sidebar() {
    return (
            <header className="hidden md:flex md:w-1/2 md:overflow-y-auto flex-col justify-between bg-brand px-12.5 py-15">
            <nav aria-label="Main">
                <ul className="flex flex-col gap-4.5">
                    {primaryNav.map((item) => (
                        <li key={item.label}>
                            <NavLink item={item} className={linkClasses} />
                        </li>
                    ))}
                </ul>
            </nav>

            <p className="py-10 font-light leading-[1.8]">
                I&apos;m Xeno, a product photographer specializing in creative
                commercial photography and brand storytelling.
            </p>

            <nav aria-label="Social and contact">
                <ul className="flex flex-col gap-4.5">
                    {secondaryNav.map((item) => (
                        <li key={item.label}>
                            <NavLink item={item} className={linkClasses} />
                        </li>
                    ))}
                </ul>
            </nav>

            <p className="mt-5 font-serif text-xs font-light text-white/60">
                Imagined, Created, Designed by Xeno
            </p>
        </header>
    );
}
