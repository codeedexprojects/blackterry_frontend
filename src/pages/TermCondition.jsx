import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#1a1a1a]">Terms and Conditions</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">1. Overview</h2>
        <p>
          These terms and conditions govern your use of our website <strong>blackterry.in</strong> and your purchases with Black Terry.
          By accessing our website or placing an order, you agree to abide by these terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">2. Products & Pricing</h2>
        <ul className="list-disc pl-6">
          <li>All prices listed are inclusive of applicable taxes.</li>
          <li>We reserve the right to change product prices and availability without prior notice.</li>
          <li>Product images are for reference only. Actual color and design may slightly vary due to lighting and screen settings.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">3. Orders & Payments</h2>
        <ul className="list-disc pl-6">
          <li>Orders are confirmed only after successful payment.</li>
          <li>We accept secure payments through UPI, Credit/Debit Cards, and Net Banking.</li>
          <li>In rare cases, if a product is out of stock after ordering, we will inform you and initiate a full refund.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">4. Shipping & Delivery</h2>
        <ul className="list-disc pl-6">
          <li>We aim to dispatch orders within 1–3 business days.</li>
          <li>Delivery timelines depend on your location but generally range between 3–7 working days.</li>
          <li>We are not responsible for delays caused by courier partners.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">5. Cancellations & Refunds</h2>
        <p>
          Please refer to our <a href="/cancellation-refund-policy" className="text-blue-600 underline">Cancellation & Refund Policy</a> for detailed information.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">6. Intellectual Property</h2>
        <p>
          All content, including logos, images, product designs, and text on this website, is the property of Black Terry and protected by copyright laws.
          Unauthorized use or reproduction is strictly prohibited.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">7. User Responsibilities</h2>
        <ul className="list-disc pl-6">
          <li>You agree to provide accurate and complete information during checkout.</li>
          <li>You must not use this website for unlawful purposes or post harmful content.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">8. Changes to Terms</h2>
        <p>
          Black Terry reserves the right to update or change these terms at any time. Continued use of the site implies acceptance of the revised terms.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">9. Contact Us</h2>
        <p>If you have any questions or concerns regarding these terms, feel free to reach out:</p>
        <p className="mt-2 text-green-600 font-medium">
          📧 <a href="mailto:support@blackterry.in" className="hover:underline">support@blackterry.in</a><br />
          📞 <a href="tel:+919876543210" className="hover:underline">+91 98765 43210</a>
        </p>
      </section>
    </div>
  );
};

export default TermsAndConditions;
