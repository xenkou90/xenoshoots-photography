type InternalPath = "/" | "/gallery";

export type NavItem =
    | { kind: "page"; label: string; href: InternalPath }
    | { kind: "external"; label: string; href: `https://${string}` }
    | { kind: "contact"; label: string };

export const primaryNav: NavItem[] = [
    { kind: "page", label: "Home", href: "/" },
    { kind: "page", label: "Gallery", href: "/gallery" },
];

export const secondaryNav: NavItem[] = [
    {
        kind: "external",
        label: "Instagram",
        href: "https://instagram.com/xeno.shoots",
    },
    { kind: "contact", label: "Contact" },
];
