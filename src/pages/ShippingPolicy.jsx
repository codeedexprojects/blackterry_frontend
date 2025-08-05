import React from 'react';

const ShippingPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#1a1a1a]">Shipping Policy</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">1. Order Processing</h2>
        <p>
          At <strong>Black Terry</strong>, we strive to process and dispatch your orders as quickly as possible.
          All orders are typically processed within <strong>1 to 3 business days</strong> (excluding weekends and public holidays).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">2. Shipping Partners</h2>
        <p>
          We work with trusted courier partners to ensure safe and timely delivery of your products. All shipments are trackable and insured.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">3. Estimated Delivery Time</h2>
        <ul className="list-disc pl-6">
          <li><strong>Metro cities:</strong> 3–5 business days</li>
          <li><strong>Tier 2 & Tier 3 cities:</strong> 5–7 business days</li>
          <li><strong>Remote areas:</strong> 7–10 business days</li>
        </ul>
        <p className="mt-2">*Please note: Delivery times are estimates and may vary due to external factors like weather, festivals, or courier delays.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">4. Shipping Charges</h2>
        <ul className="list-disc pl-6">
          <li>We offer <strong>free shipping</strong> on all prepaid orders above ₹499.</li>
          <li>Orders below ₹499 may attract a minimal shipping fee, displayed at checkout.</li>
          <li>Cash on Delivery (COD) orders may incur an additional charge.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">5. Order Tracking</h2>
        <p>
          Once your order is shipped, you will receive a confirmation email or SMS with a tracking ID. You can track your order via the courier partner's website or directly from your account dashboard.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">6. Delayed or Lost Shipments</h2>
        <p>
          In case of any delay or if your order hasn't reached you within the estimated delivery time, please contact our support team at <a href="mailto:support@blackterry.in" className="text-blue-600 underline">support@blackterry.in</a>. We will escalate the issue and ensure it is resolved at the earliest.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">7. Contact Us</h2>
        <p>For any queries related to shipping, reach out to:</p>
        <p className="mt-2 text-green-600 font-medium">
          📧 <a href="mailto:support@blackterry.in" className="hover:underline">support@blackterry.in</a><br />
          📞 <a href="tel:+919876543210" className="hover:underline">+91 98765 43210</a>
        </p>
      </section>
    </div>
  );
};

export default ShippingPolicy;
