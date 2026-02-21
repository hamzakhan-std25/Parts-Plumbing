import Header from "@/components/layout/Header";
import Container from "@/components/layout/Container";

export default function TermsConditions() {
  return (
    <>
      <Container className="py-12">
        <h1 className="text-4xl font-bold mb-6 text-white ">Terms & Conditions</h1>
        <p className="text-white mb-8">Last updated: February 21, 2026</p>

        <div className="prose prose-lg max-w-4xl text-gray-200 space-y-6">
          <p>
            Welcome to <strong>KPK PLUMBING</strong>. By accessing our website or making a purchase, you agree to be bound by these Terms & Conditions. Please read them carefully.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. General</h2>
          <p>
            KPK PLUMBING operates this website to provide plumbing products and related information to customers in Pakistan, especially Khyber Pakhtunkhwa (KPK). We reserve the right to modify these terms at any time without prior notice.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Account Registration</h2>
          <p>
            To place an order, you may need to create an account. You are responsible for maintaining the confidentiality of your account and password. You agree to provide accurate, current, and complete information.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Products and Pricing</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>All product descriptions, images, and prices are subject to change without notice.</li>
            <li>We strive to display accurate colors and details, but we cannot guarantee that your monitor's display is exact.</li>
            <li>Prices are in Pakistani Rupees (PKR) and include applicable taxes unless stated otherwise.</li>
            <li>We reserve the right to correct any pricing errors and cancel orders if necessary.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Orders and Payment</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>All orders are subject to acceptance and availability.</li>
            <li>We accept payment via bank transfer, credit/debit card, or cash on delivery (COD) where available.</li>
            <li>For COD orders, full payment is required upon delivery.</li>
            <li>Once an order is placed, you will receive a confirmation email. We may contact you for verification.</li>
            <li>We reserve the right to refuse or cancel any order for reasons including fraud, inaccurate information, or stock unavailability.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Shipping and Delivery</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>We deliver across KPK and other regions of Pakistan. Delivery times are estimates and not guaranteed.</li>
            <li>Shipping costs are calculated at checkout based on location and order weight.</li>
            <li>Risk of loss passes to you upon delivery. Please inspect products immediately and report any damage.</li>
            <li>Delays may occur due to weather, strikes, or other unforeseen circumstances. We are not liable for such delays.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Returns and Refunds</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>We accept returns within 7 days of delivery if the product is defective, damaged, or incorrect.</li>
            <li>Items must be unused and in original packaging. Return shipping costs are borne by the customer unless the error is ours.</li>
            <li>Refunds will be processed within 5-7 business days after inspection and approval.</li>
            <li>Custom or special-order items are non-refundable unless defective.</li>
            <li>For hygiene reasons, sanitary products cannot be returned once used.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Warranty</h2>
          <p>
            Product warranties vary by brand and product. Please refer to the product description or contact us for warranty details. Our liability is limited to repair, replacement, or refund of the product price.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, KPK PLUMBING shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website. Our total liability shall not exceed the amount paid for the product.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Intellectual Property</h2>
          <p>
            All content on this site (text, images, logos, etc.) is the property of KPK PLUMBING or its licensors and is protected by copyright laws. You may not reproduce, distribute, or modify any content without written permission.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Governing Law</h2>
          <p>
            These terms are governed by the laws of Pakistan. Any disputes shall be subject to the exclusive jurisdiction of the courts in Peshawar, KPK.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">11. Contact Information</h2>
          <p>For any questions regarding these Terms, please contact us:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Email: <a href="mailto:support@kpkplumbing.com" className="text-blue-600 hover:underline">support@kpkplumbing.com</a></li>
            <li>WhatsApp: <a href="https://wa.me/923001234567" className="text-blue-600 hover:underline">+92 300 1234567</a></li>
          </ul>
        </div>
      </Container>
    </>
  );
}