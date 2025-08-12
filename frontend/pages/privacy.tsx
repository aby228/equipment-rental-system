import Head from 'next/head'
import Link from 'next/link'
import config from '@/config/site'

export default function PrivacyPage() {
  const company = config?.name || 'Our Company'
  const websiteUrl = config?.url || ''
  return (
    <>
      <Head>
        <title>Privacy Policy | {company}</title>
        <meta name="robots" content="index,follow" />
      </Head>
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-gray mt-8 max-w-none dark:prose-invert">
          <h2>1. Overview</h2>
          <p>
            This Privacy Policy explains how {company} ("we", "us", or "our") collects, uses, discloses, and safeguards
            your information when you visit our website{websiteUrl ? ` (${websiteUrl})` : ''} and use our services (the
            "Services"). By using the Services, you agree to the collection and use of information in accordance with
            this Policy.
          </p>

          <h2>2. Information We Collect</h2>
          <p>We may collect the following categories of information:</p>
          <ul>
            <li>
              <strong>Account and Contact Information</strong>: name, email address, phone number, billing and shipping
              addresses.
            </li>
            <li>
              <strong>Rental and Transaction Information</strong>: items rented, rental dates, pricing, deposits,
              payment method details (processed by our payment processors), and receipts.
            </li>
            <li>
              <strong>Technical Information</strong>: IP address, device identifiers, browser type, operating system,
              pages viewed, referring/exit pages, and timestamps.
            </li>
            <li>
              <strong>Cookies and Similar Technologies</strong>: used to provide and improve the Services, remember your
              preferences, and analyze usage.
            </li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <ul>
            <li>Provide, operate, and maintain the Services</li>
            <li>Process rentals, payments, and customer support requests</li>
            <li>Verify identity and prevent fraud or misuse</li>
            <li>Send service-related communications and, with your consent where required, marketing communications</li>
            <li>Analyze usage and improve the Services, including UI/UX and performance</li>
            <li>Comply with legal obligations and enforce our agreements</li>
          </ul>

          <h2>4. Legal Bases for Processing (EEA/UK Users)</h2>
          <p>Where applicable, we process personal data under these legal bases: performance of a contract, consent, legitimate interests, and compliance with legal obligations.</p>

          <h2>5. Sharing of Information</h2>
          <p>
            We may share information with service providers and partners who assist in operating the Services (e.g.,
            payment processing, hosting, analytics, identity verification). We may also share information to comply with
            law, enforce our terms, protect rights, or in connection with a business transfer.
          </p>

          <h2>6. Cookies and Tracking</h2>
          <p>
            We use cookies and similar technologies. You can control cookies through your browser settings. Disabling
            cookies may affect your ability to use certain features of the Services.
          </p>

          <h2>7. Data Retention</h2>
          <p>
            We retain personal information for as long as necessary to fulfill the purposes described in this Policy,
            comply with legal obligations, resolve disputes, and enforce our agreements.
          </p>

          <h2>8. Data Security</h2>
          <p>
            We implement reasonable administrative, technical, and physical safeguards designed to protect personal
            information. However, no method of transmission over the Internet or electronic storage is completely secure.
          </p>

          <h2>9. International Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries that may have data protection laws
            different from those in your jurisdiction. We take steps to ensure appropriate protections are in place.
          </p>

          <h2>10. Your Rights</h2>
          <p>
            Depending on your location, you may have rights regarding your personal information, including access,
            correction, deletion, restriction, and portability. You may also have the right to object to processing or
            withdraw consent where applicable. To exercise your rights, contact us using the details below.
          </p>

          <h2>11. Children’s Privacy</h2>
          <p>
            The Services are not intended for children under the age of 13 (or the age of majority in your jurisdiction).
            We do not knowingly collect personal information from children.
          </p>

          <h2>12. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The “Last updated” date indicates when the latest
            changes were made. Your continued use of the Services after changes become effective constitutes your
            acceptance of the revised Policy.
          </p>

          <h2>13. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or our privacy practices, please contact us via the details
            provided on our website. You can also review our <Link href="/terms">Terms of Service</Link>.
          </p>
        </div>
      </div>
    </>
  )
}
