import NavLink from "./NavLink";
import { primaryNav, secondaryNav } from "@/data/navigation";
import { siteCredit } from "@/data/site";
import { cn } from "@/lib/cn";

const linkClasses = cn(
  // Layout: full-width block, so the underline spans the whole sidebar
  "relative block w-full py-1.25 text-left",
  // Typography
  "font-serif text-nav tracking-[1px] wide:text-[1.9rem]",
  // Hover and keyboard focus: shift right
  "transition-[padding-left] hover:pl-2 focus-visible:pl-2",
  // Underline: an empty ::after line, 0 wide by default
  "after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-[width]",
  // Hover and keyboard focus: grow the underline to full width
  "hover:after:w-full focus-visible:after:w-full",
);

export default function Sidebar() {
  return (
    <header className="hidden flex-col justify-between bg-brand px-12.5 py-15 md:flex md:w-1/2 md:overflow-y-auto">
      <nav aria-label="Main">
        <ul className="flex flex-col gap-4.5">
          {primaryNav.map((item) => (
            <li key={item.label}>
              <NavLink item={item} className={linkClasses} />
            </li>
          ))}
        </ul>
      </nav>

      <p className="py-10 leading-[1.8] font-light">
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
        {siteCredit}
      </p>
    </header>
  );
}
