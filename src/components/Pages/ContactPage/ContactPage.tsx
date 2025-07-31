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
        <div className="container mx-auto ">
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-12">
              <ContactInfo />
            </div>
            <div className="col-span-6">
              <ContactForm />
            </div>
            <div className="col-span-6">
              <LocationMap />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
