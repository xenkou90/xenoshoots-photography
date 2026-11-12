import Image from "next/image";
import type { MouseEvent, Ref } from "react";
import contactLogo from "@/assets/contact-logo.png";
import { contactEmail } from "@/data/site";

const dialogClasses = [
  // Size, position and appearance of the white box
  "m-auto w-[92%] max-w-125 rounded-lg bg-white p-0 text-center text-black md:w-[90%]",
  // Box: fade and scale. Closed state, then open state, then the state it starts from when opening
  "opacity-0 scale-95 transition-[opacity,scale,display,overlay] transition-discrete",
  "open:opacity-100 open:scale-100",
  "starting:open:opacity-0 starting:open:scale-95",
  // Backdrop: fade in and out the same way
  "backdrop:bg-black/0 backdrop:transition-[background-color,display,overlay] backdrop:transition-discrete",
  "open:backdrop:bg-black/85 starting:open:backdrop:bg-black/0",
].join(" ");

type ContactDialogProps = {
    ref: Ref<HTMLDialogElement>;
};

export default function ContactDialog({ ref }: ContactDialogProps) {
    function handleClick(event: MouseEvent<HTMLDialogElement>) {
        if (event.target === event.currentTarget) {
            event.currentTarget.close();
        }
    }

    return (
        <dialog
            ref={ref}
            aria-label="Contact"
            onClick={handleClick}
            className={dialogClasses}
        >
            <div className="relative flex flex-col items-center gap-6.25 px-5.5 py-8 xs:px-7.5 xs:py-10 md:px-15 md:py-12.5">
                <form method="dialog">
                    <button
                        aria-label="Close"
                        className="absolute top-2.5 right-3.75 text-[30px] leading-none font-light transition-colors hover:text-brand focus-visible:text-brand md:top-3.75 md:right-6.25 md:text-[35px]"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </form>

                <p className="text-[0.9rem] leading-[1.6] md:text-base">
                    The best way to reach me is by email.
                </p>

                <Image
                    src={contactLogo}
                    alt=""
                    className="h-auto w-20 drop-shadow-[0_4px_12px_rgb(0_0_0/0.35)]"
                />

                <div>
                    <p className="mb-2.5 text-[0.95rem]">
                        Email me at: <strong className="font-semibold">{contactEmail}</strong>
                    </p>
                    <p className="mb-5 text-[0.85rem] text-brand">
                        or press the button below to open your mail app
                    </p>
                    <a
                        href={`mailto:${contactEmail}`}
                        className="inline-block border-2 border-black bg-black px-8 py-3 font-serif text-[0.8rem] font-semibold tracking-[2px] text-white uppercase transition-colors hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black md:px-10 md:py-3.75 md:text-[0.9rem]"
                    >
                        Send me an email
                    </a>
                </div>
            </div>
        </dialog>
    );
}
