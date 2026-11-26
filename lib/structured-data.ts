import type { Graph } from "schema-dts";
import { contactEmail, instagramUrl, siteName, siteUrl } from "@/data/site";

const organizationId = new URL("/#organization", siteUrl).href;
const websiteId = new URL("/#website", siteUrl).href;

export const structuredData: Graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: siteName,
      url: siteUrl,
      logo: new URL("/icon.png", siteUrl).href,
      email: contactEmail,
      sameAs: [instagramUrl],
      description:
        "Creative commercial product photography and brand storytelling.",
      address: {
        "@type": "PostalAddress",
        addressCountry: "GR",
      },
      founder: {
        "@type": "Person",
        name: "Xeno",
        jobTitle: "Product Photographer",
      },
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: siteName,
      url: siteUrl,
      inLanguage: "en",
      publisher: { "@id": organizationId },
    },
  ],
};

export function toJsonLd(data: Graph): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
