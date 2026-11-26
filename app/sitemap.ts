import type { MetadataRoute } from "next";
import { pagePaths } from "@/data/navigation";
import { siteUrl } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return pagePaths.map((path) => ({
    url: new URL(path, siteUrl).href,
  }));
}
