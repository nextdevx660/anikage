export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://anikage.dpdns.org/sitemap.xml",
  };
}
