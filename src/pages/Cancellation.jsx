import React from 'react';

const CancellationRefundPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#1a1a1a]">Cancellation & Refund Policy</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">1. Order Cancellation</h2>
        <p>
          At <strong>Black Terry</strong>, we understand that you may sometimes need to cancel your order.
          Orders can be canceled within <strong>2 hours</strong> of placing them, provided they have not been shipped.
          Once your order has been dispatched, we cannot cancel it.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">2. Refund Eligibility</h2>
        <p>
          Refunds are applicable under the following conditions:
        </p>
        <ul className="list-disc pl-6 mt-2">
          <li>Product was damaged during delivery</li>
          <li>Wrong item received</li>
          <li>Order canceled before dispatch</li>
        </ul>
        <p className="mt-2">
          You must report any issues within <strong>48 hours</strong> of delivery.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">3. Refund Process</h2>
        <p>
          Once your refund request is approved, the refund will be processed to your original payment method
          within <strong>7–10 business days</strong>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">4. Return Instructions</h2>
        <p>
          If a return is required, our support team will guide you through the steps. The product must be unused,
          in its original packaging, and with all tags intact.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">5. Contact Us</h2>
        <p>
          If you have any questions about cancellations or refunds, feel free to contact our support team at:
        </p>
        <p className="mt-2 text-green-600 font-medium">
          📧 <a href="mailto:support@blackterry.in" className="hover:underline">support@blackterry.in</a><br />
          📞 <a href="tel:+919876543210" className="hover:underline">+91 98765 43210</a>
        </p>
      </section>
    </div>
  );
};

export default CancellationRefundPolicy;
