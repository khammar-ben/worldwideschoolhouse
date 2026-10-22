import type { MetadataRoute } from "next";
import { nav, site } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", ...nav.map((n) => n.href)].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }));
}
