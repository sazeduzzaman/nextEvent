import React from "react";
import { Mail, MapPin, Phone, Globe } from "lucide-react";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { fetchSiteInformation } from "@/lib/api/SiteInfromationData/SiteInformationDataSet";

const socialIconsMap = {
  Facebook: Facebook,
  Instagram: Instagram,
  LinkedIn: Linkedin,
  Twitter: Twitter,
  YouTube: Youtube,
};

type SocialLabel = keyof typeof socialIconsMap;

const ContactInfo = async () => {
  const siteInfo = await fetchSiteInformation();

  const socialItems: { label: SocialLabel; url: string | null }[] = [
    { label: "Facebook", url: siteInfo.facebook_url },
    { label: "Instagram", url: siteInfo.instagram_url },
    { label: "LinkedIn", url: siteInfo.linkedin_url },
    { label: "Twitter", url: siteInfo.twitter_url },
    { label: "YouTube", url: siteInfo.youtube_url },
  ];

  return (
    <section className="container mx-auto p-8 space-y-14 text-white">
      <h1 className="text-4xl font-extrabold mb-6 text-amber-400 border-l-4 border-amber-400 pl-4">
        Contact Information
      </h1>

      {/* Grid with responsive columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Address Card */}
        <div className="bg-white/5 rounded-2xl p-8 shadow-lg flex items-start gap-6 transition hover:shadow-2xl hover:scale-[1.03] duration-300">
          <MapPin className="text-amber-400 w-12 h-12 flex-shrink-0" />
          <div>
            <h2 className="text-2xl font-semibold mb-2">Address</h2>
            <p className="text-gray-300 leading-relaxed">
              {siteInfo.address_one || "N/A"}
              {siteInfo.address_two ? `, ${siteInfo.address_two}` : ""}
              {!siteInfo.address_one &&
                !siteInfo.address_two &&
                "No address available."}
            </p>
          </div>
        </div>

        {/* Phone Card */}
        <div className="bg-white/5 rounded-2xl p-8 shadow-lg flex items-start gap-6 transition hover:shadow-2xl hover:scale-[1.03] duration-300">
          <Phone className="text-amber-400 w-12 h-12 flex-shrink-0" />
          <div>
            <h2 className="text-2xl font-semibold mb-2">Phone</h2>
            <p className="text-gray-300 leading-relaxed">
              {siteInfo.primary_phone || "N/A"}
            </p>
            {siteInfo.alternative_phone && (
              <p className="text-gray-300 leading-relaxed">
                Alt: {siteInfo.alternative_phone}
              </p>
            )}
            {siteInfo.whatsapp_number && (
              <p className="text-gray-300 leading-relaxed">
                WhatsApp:{" "}
                <a
                  href={`https://wa.me/${siteInfo.whatsapp_number.replace(
                    /\D/g,
                    ""
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-amber-400"
                >
                  {siteInfo.whatsapp_number}
                </a>
              </p>
            )}
          </div>
        </div>

        {/* Email & Website Card */}
        <div className="bg-white/5 rounded-2xl p-8 shadow-lg flex items-start gap-6 transition hover:shadow-2xl hover:scale-[1.03] duration-300">
          <Mail className="text-amber-400 w-12 h-12 flex-shrink-0" />
          <div className="flex flex-col gap-6 w-full">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Email</h2>
              <p className="text-gray-300 leading-relaxed">
                {siteInfo.primary_email || "N/A"}
              </p>
              {siteInfo.support_email && (
                <p className="text-gray-300 leading-relaxed">
                  Support: {siteInfo.support_email}
                </p>
              )}
              {siteInfo.info_email && (
                <p className="text-gray-300 leading-relaxed">
                  Info: {siteInfo.info_email}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Globe className="text-amber-400 w-6 h-6" />
              <a
                href={siteInfo.site_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 underline hover:text-amber-400"
              >
                {siteInfo.site_url}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="mt-10 flex flex-wrap justify-center gap-8 text-gray-300 text-3xl">
        {socialItems
          .filter((item) => item.url)
          .map(({ label, url }) => {
            const Icon = socialIconsMap[label];
            return (
              <a
                key={label}
                href={url!}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 transition"
                aria-label={label}
              >
                <Icon />
              </a>
            );
          })}
      </div>
    </section>
  );
};

export default ContactInfo;
