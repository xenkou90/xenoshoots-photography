import Link from "next/link";
import type { NavItem } from "@/data/navigation";

type NavLinkProps = {
    item: NavItem;
    className?: string;
};

export default function NavLink({ item, className }: NavLinkProps) {
    switch (item.kind) {
        case "page":
            return (
                <Link href={item.href} className={className}>
                    {item.label}
                </Link>
            );
        case "external":
            return (
                <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                >
                    {item.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                </a>
            );
        case "contact":
            return (
                <button type="button" className={className}>
                    {item.label}
                </button>
            );
    }
}
