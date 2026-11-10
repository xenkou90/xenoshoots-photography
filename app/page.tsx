import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main className="p-12">
      <p>Page content goes here.</p>
    </main>
  );
}
