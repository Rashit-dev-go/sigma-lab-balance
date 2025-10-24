import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="mb-8">
            <Link
              href="/onboarding"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              ← Back to Onboarding
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-sm text-gray-600 mb-8">
              <strong>Version:</strong> 1.0<br />
              <strong>Last Updated:</strong> October 24, 2025<br />
              <strong>Effective Date:</strong> October 24, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                Welcome to Balance ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our financial management application.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>

              <h3 className="text-xl font-medium text-gray-800 mb-3">2.1 Personal Information</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                <li>Email address for account creation and communication</li>
                <li>Authentication credentials (passwords are hashed and salted)</li>
                <li>IP address and user agent for security logging</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">2.2 Financial Information</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                <li>Transaction amounts, descriptions, and categories</li>
                <li>All financial data is encrypted at rest using AES-256 encryption</li>
                <li>AI categorization attempts and user corrections</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                <li>Provide financial management services and AI-powered categorization</li>
                <li>Maintain security and prevent unauthorized access</li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Improve our services through aggregated, anonymized analytics</li>
                <li>Send important service notifications and updates</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement industry-standard security measures to protect your data:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                <li>All data encrypted using AES-256 encryption</li>
                <li>Secure communication via TLS 1.3</li>
                <li>Regular security audits and penetration testing</li>
                <li>Access controls and audit logging</li>
                <li>Regular data backups with encryption</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Retention</h2>
              <p className="text-gray-700 mb-4">
                We retain your personal information only as long as necessary for the purposes outlined in this policy:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                <li>Account data: Retained while account is active</li>
                <li>Transaction data: Retained for 7 years for tax compliance</li>
                <li>Audit logs: Retained for 3 years for security purposes</li>
                <li>Deleted data is permanently removed from our systems</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights</h2>
              <p className="text-gray-700 mb-4">You have the right to:</p>
              <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                <li>Access your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Request data deletion</li>
                <li>Withdraw consent for data processing</li>
                <li>Data portability</li>
                <li>Lodge complaints with supervisory authorities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <p className="text-gray-700">
                Email: privacy@balanceapp.com<br />
                Address: [Company Address]<br />
                Phone: [Contact Number]
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Changes to This Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                <li>Email notification</li>
                <li>In-app notification</li>
                <li>Updated effective date on this page</li>
              </ul>
              <p className="text-gray-700">
                Your continued use of our services after such changes constitutes acceptance of the updated policy.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
