import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#1a1a1a]">Privacy Policy</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
        <p>
          At <strong>Black Terry</strong>, we value your privacy and are committed to protecting your personal information.
          This Privacy Policy outlines how we collect, use, and safeguard your data when you use our website or make purchases.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul className="list-disc pl-6 mt-2">
          <li>Personal details (name, email, phone number, address)</li>
          <li>Order and payment details</li>
          <li>Browsing data (cookies, IP address, browser type)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">3. How We Use Your Information</h2>
        <p>Your data is used for the following purposes:</p>
        <ul className="list-disc pl-6 mt-2">
          <li>To process and deliver your orders</li>
          <li>To improve our website and customer experience</li>
          <li>To send order confirmations and promotional emails (with your consent)</li>
          <li>To detect and prevent fraud or misuse</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
        <p>
          We take appropriate security measures to protect your data from unauthorized access, alteration, disclosure, or destruction.
          All transactions are secured using encryption and are processed through trusted payment gateways.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">5. Sharing of Information</h2>
        <p>
          We do not sell or rent your personal information to third parties.
          However, we may share your data with service providers (like courier and payment services) strictly for the purpose of fulfilling your order.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">6. Your Rights</h2>
        <p>You have the right to:</p>
        <ul className="list-disc pl-6 mt-2">
          <li>Access and review the personal data we hold about you</li>
          <li>Request corrections or deletions</li>
          <li>Opt-out of marketing communications</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">7. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised date.
          Please check this page periodically for updates.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">8. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, feel free to contact us at:
        </p>
        <p className="mt-2 text-green-600 font-medium">
          📧 <a href="mailto:support@blackterry.in" className="hover:underline">support@blackterry.in</a><br />
          📞 <a href="tel:+919876543210" className="hover:underline">+91 98765 43210</a>
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
