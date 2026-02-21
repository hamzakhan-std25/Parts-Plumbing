import Header from "@/components/layout/Header";
import Container from "@/components/layout/Container";

export default function PrivacyPolicy() {
  return (
    <>
      <Container className="py-12">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Privacy Policy</h1>
        <p className="text-white mb-8">Last updated: February 21, 2026</p>

        <div className="prose prose-lg max-w-4xl text-gray-200 space-y-6">
          <p>
            At <strong>KPK PLUMBING</strong>, we value your privacy and are committed to protecting your personal data. 
            This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
            and purchase our products. Please read it carefully.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
          <p>We may collect personal information that you voluntarily provide when you:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Create an account or place an order (name, email, phone, shipping address).</li>
            <li>Contact us via WhatsApp, email, or contact forms.</li>
            <li>Subscribe to our newsletter.</li>
            <li>Participate in surveys or promotions.</li>
          </ul>
          <p>We also automatically collect certain information when you visit our site, including:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>IP address, browser type, device information.</li>
            <li>Pages visited, time spent, and referring URLs.</li>
            <li>Cookies and similar tracking technologies (see Section 4).</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
          <p>We use your information for the following purposes:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>To process and fulfill your orders, including delivery and payment.</li>
            <li>To communicate with you about your orders, inquiries, or promotions.</li>
            <li>To improve our website, products, and customer service.</li>
            <li>To comply with legal obligations and prevent fraud.</li>
            <li>With your consent, to send marketing communications.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Sharing Your Information</h2>
          <p>We do not sell, trade, or rent your personal information to third parties. We may share your data with:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Service providers:</strong> Payment processors, delivery companies, and IT support (bound by confidentiality).</li>
            <li><strong>Legal authorities:</strong> When required by law or to protect our rights.</li>
            <li><strong>Business transfers:</strong> In case of a merger, acquisition, or sale of assets.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Cookies and Tracking Technologies</h2>
          <p>We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookies through your browser settings. By continuing to use our site, you consent to our use of cookies.</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Security</h2>
          <p>We implement reasonable security measures to protect your personal information from unauthorized access, alteration, or destruction. However, no method of transmission over the Internet is 100% secure.</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Access, correct, or delete your personal data.</li>
            <li>Object to or restrict processing.</li>
            <li>Withdraw consent at any time.</li>
            <li>Lodge a complaint with a data protection authority.</li>
          </ul>
          <p>To exercise these rights, please contact us at <a href="mailto:privacy@kpkplumbing.com" className="text-blue-600 hover:underline">privacy@kpkplumbing.com</a>.</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Third-Party Links</h2>
          <p>Our website may contain links to external sites. We are not responsible for their privacy practices and encourage you to read their policies.</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Children’s Privacy</h2>
          <p>Our site is not intended for individuals under 18. We do not knowingly collect data from children.</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Changes to This Policy</h2>
          <p>We may update this policy from time to time. Changes will be posted on this page with an updated revision date.</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Email: <a href="mailto:privacy@kpkplumbing.com" className="text-blue-600 hover:underline">privacy@kpkplumbing.com</a></li>
            <li>WhatsApp: <a href="https://wa.me/923001234567" className="text-blue-600 hover:underline">+92 300 1234567</a></li>
            <li>Address: Shop #5, Saddar Road, Peshawar, KPK</li>
          </ul>
        </div>
      </Container>
    </>
  );
}