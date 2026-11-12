"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import ContactDialog from "./ContactDialog";

type ContactContextValue = {
    openContact: () => void;
};

const ContactContext = createContext<ContactContextValue | null>(null);

export function ContactProvider({ children }: { children: ReactNode }) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const openContact = () => dialogRef.current?.showModal();

    return (
        <ContactContext value={{ openContact }}>
            {children}
            <ContactDialog ref={dialogRef} />
        </ContactContext>
    );
}

export function useContact() {
    const context = useContext(ContactContext);
    if (!context) {
        throw new Error("useContact must be used inside <ContactProvide>");
    }
    return context;
}
