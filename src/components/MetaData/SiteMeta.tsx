import { fetchSiteInformation } from "@/lib/api/SiteInfromationData/SiteInformationDataSet";
import type { Metadata } from "next";

export async function generateSiteMetadata(): Promise<Metadata> {
  const siteInfo = await fetchSiteInformation();

  return {
    title: siteInfo.site_title || "Event Tailor - Empowering Your Events",
    description:
      siteInfo.meta_description ||
      "Event Tailor is your one-stop solution for managing and organizing your events seamlessly. Trusted by professionals worldwide.",
    keywords: siteInfo.meta_tags?.split(",").map((tag) => tag.trim()) ?? [],
    metadataBase: new URL(siteInfo.site_url || "https://www.eventstailor.org"),
    applicationName:
      siteInfo.website_name || siteInfo.company_name || "Event Tailor",
    category: "business",
    generator: "Next.js",
    // themeColor: siteInfo.theme_color || "#3490dc",
    // colorScheme: siteInfo.dark_mode ? "dark" : "light",

    icons: {
      icon: siteInfo.site_favicon || "/favicon.ico",
      shortcut: siteInfo.site_favicon || "/favicon.ico",
      apple: siteInfo.site_favicon || "/favicon.ico",
    },

    openGraph: {
      title: siteInfo.og_title || siteInfo.site_title || "Event Tailor",
      description:
        siteInfo.og_description ||
        siteInfo.meta_description ||
        "Event Tailor helps you organize, manage, and promote your events effectively.",
      url: siteInfo.canonical_url || siteInfo.site_url,
      siteName: siteInfo.website_name || siteInfo.site_title || "Event Tailor",
      type: "website",
      images: [
        {
          url: siteInfo.og_image || "/images/placeholderImage.webp",
          alt: siteInfo.site_title || "Event Tailor",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: siteInfo.og_title || siteInfo.site_title || "Event Tailor",
      description:
        siteInfo.og_description ||
        siteInfo.meta_description ||
        "Manage and promote your events seamlessly with Event Tailor.",
      images: [siteInfo.og_image || "/images/placeholderImage.webp"],
      site: siteInfo.twitter_url || "https://twitter.com",
    },

    alternates: {
      canonical: siteInfo.canonical_url || siteInfo.site_url,
    },

    other: {
      copyright:
        siteInfo.copyright_title ||
        `© ${new Date().getFullYear()} Event Tailor. All rights reserved.`,
      "company-name": siteInfo.company_name || "Event Tailor Inc.",
      "primary-email": siteInfo.primary_email || "",
      "support-email": siteInfo.support_email || "",
      "info-email": siteInfo.info_email || "",
      "primary-phone": siteInfo.primary_phone || "",
      facebook: siteInfo.facebook_url || "",
      instagram: siteInfo.instagram_url || "",
      linkedin: siteInfo.linkedin_url || "",
      whatsapp: siteInfo.whatsapp_url || "",
      youtube: siteInfo.youtube_url || "",
      tiktok: siteInfo.tiktok_url || "",
    },
  };
}
