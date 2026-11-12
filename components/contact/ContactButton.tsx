"use client";

import type { ReactNode } from "react";
import { useContact } from "./ContactProvider";

type ContactButtonProps = {
    className?: string;
    onClick?: () => void;
    children: ReactNode;
};

export default function ContactButton({
    className,
    onClick,
    children,
}: ContactButtonProps) {
    const { openContact } = useContact();

    function handleClick() {
        onClick?.();
        openContact();
    }

    return (
        <button type="button" className={className} onClick={handleClick}>
            {children}
        </button>
    );
}
