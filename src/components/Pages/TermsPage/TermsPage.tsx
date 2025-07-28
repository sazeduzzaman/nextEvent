import React from "react";

const TermsPage = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-gray-800">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Terms & Conditions
      </h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
        <p className="leading-relaxed">
          These Terms & Conditions govern your use of our event organization
          platform. By accessing or using our website, you agree to be bound by
          these terms.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">2. Services</h2>
        <p className="leading-relaxed">
          Our platform enables users to discover, create, and manage events. We
          reserve the right to modify, suspend, or discontinue any service at
          any time without notice.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">3. User Responsibilities</h2>
        <p className="leading-relaxed">
          You are responsible for the accuracy of the event details you provide.
          You agree not to post any misleading, harmful, or illegal content, and
          to comply with all applicable laws when using our platform.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">
          4. Event Listings & Ticketing
        </h2>
        <p className="leading-relaxed">
          Event organizers are solely responsible for managing ticket sales,
          cancellations, and refunds. We act as a platform and do not guarantee
          the success or outcome of any event listed.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">5. Account & Security</h2>
        <p className="leading-relaxed">
          You are responsible for maintaining the confidentiality of your
          account credentials. We are not liable for any loss or damage arising
          from unauthorized access to your account.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">
          6. Limitation of Liability
        </h2>
        <p className="leading-relaxed">
          We are not liable for any damages arising from your use of the
          platform or participation in events. All services are provided “as is”
          without warranties of any kind.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">7. Contact Us</h2>
        <p className="leading-relaxed">
          If you have any questions about these Terms & Conditions, contact us
          at{" "}
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

export default TermsPage;
