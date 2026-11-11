import Link from "next/link";
import type { NavItem } from "@/data/navigation";

type NavLinkProps = {
    item: NavItem;
    className?: string;
    onClick?: () => void;
};

export default function NavLink({ item, className, onClick }: NavLinkProps) {
    switch (item.kind) {
        case "page":
            return (
                <Link href={item.href} className={className} onClick={onClick}>
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
                    onClick={onClick}
                >
                    {item.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                </a>
            );
        case "contact":
            return (
                <button type="button" className={className} onClick={onClick}>
                    {item.label}
                </button>
            );
    }
}
