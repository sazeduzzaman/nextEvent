import React from "react";

const PrivacyPage = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-gray-800 ">
      <h1 className="text-3xl font-bold mb-8 text-center">Privacy Policy</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
        <p className="leading-relaxed">
          We value your privacy and are committed to protecting your personal
          data. This privacy policy outlines how we collect, use, and safeguard
          your information when you visit our website or use our services.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">
          2. Information We Collect
        </h2>
        <p className="leading-relaxed">
          We may collect personal information including your name, email
          address, and other data you voluntarily provide. We also gather
          anonymized analytics such as browser type, pages visited, and time
          spent on our site.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">
          3. How We Use Your Information
        </h2>
        <p className="leading-relaxed">
          Your information is used to improve our services, communicate with
          you, and personalize your experience. We do not sell or share your
          data with third parties unless required by law.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">4. Your Rights</h2>
        <p className="leading-relaxed">
          You have the right to access, update, or delete your personal data.
          You may also opt out of marketing communications at any time.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">5. Contact Us</h2>
        <p className="leading-relaxed">
          If you have any questions or concerns about this policy, feel free to
          contact us at{" "}
          <a
            href="mailto:support@example.com"
            className="text-blue-600 underline"
          >
            support@example.com
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default PrivacyPage;
