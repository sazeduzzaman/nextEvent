import CommonBanner from "@/components/CommonBanner/CommonBanner";
import React from "react";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import LocationMap from "./LocationMap";

const ContactPage = () => {
  return (
    <div>
      <CommonBanner
        title="Contact"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
          { label: "Details" },
        ]}
      />
      <div className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-1 lg:gap-10">
            {/* Contact Info full width */}
            <div className="col-span-12">
              <ContactInfo />
            </div>

            {/* Contact Form and LocationMap stack on mobile, side-by-side on md+ */}
            <div className="col-span-12 md:col-span-6">
              <div className="mb-10 md:mb-0">
                <ContactForm />
              </div>
            </div>
            <div className="col-span-12 md:col-span-6">
              <LocationMap />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
