import Head from 'next/head'
import Link from 'next/link'
import config from '@/config/site'

export default function TermsPage() {
  const company = config?.name || 'Our Company'
  const websiteUrl = config?.url || ''
  return (
    <>
      <Head>
        <title>Terms of Service | {company}</title>
        <meta name="robots" content="index,follow" />
      </Head>
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-gray mt-8 max-w-none dark:prose-invert">
          <h2>1. Agreement to Terms</h2>
          <p>
            These Terms of Service (the “Terms”) constitute a legally binding agreement between you and {company}
            (“we”, “us”, or “our”) governing your access to and use of our website{websiteUrl ? ` (${websiteUrl})` : ''},
            products, and services (collectively, the “Services”). By accessing or using the Services, you agree to be
            bound by these Terms. If you do not agree, do not use the Services.
          </p>

          <h2>2. Eligibility</h2>
          <p>
            You must be at least 18 years old, or the age of majority in your jurisdiction, to use the Services. By
            using the Services, you represent and warrant that you meet this requirement and have the authority to enter
            into these Terms.
          </p>

          <h2>3. Accounts and Security</h2>
          <p>
            To access certain features, you may need to create an account. You agree to provide accurate and complete
            information, keep your credentials confidential, and promptly update your information as needed. You are
            responsible for all activities that occur under your account.
          </p>

          <h2>4. Rentals, Orders, and Payments</h2>
          <p>
            Our platform facilitates the rental of construction equipment and related accessories. Pricing, availability,
            rental periods, deposits, delivery, and pickup terms will be displayed during checkout or on product pages.
            You authorize us (and our payment processors) to charge your selected payment method for all amounts due,
            including applicable taxes, fees, deposits, overages, damages, and late returns, in accordance with the
            posted policies.
          </p>

          <h2>5. Acceptable Use</h2>
          <p>
            You agree not to misuse the Services, including by: (a) violating any law or third-party right; (b)
            attempting to interfere with the proper working of the Services; (c) uploading or transmitting malware; (d)
            scraping, reverse engineering, or accessing non-public areas without authorization; or (e) using the
            Services to engage in fraudulent, deceptive, or harmful conduct.
          </p>

          <h2>6. Equipment Use and Responsibility</h2>
          <p>
            You are responsible for safe, lawful, and proper use of rented equipment, including ensuring adequate
            training, personal protective equipment, and compliance with all manufacturer instructions and regulations.
            You are liable for loss, theft, damage (normal wear excluded), misuse, or unauthorized use during the rental
            period, as further detailed in the applicable rental terms.
          </p>

          <h2>7. Intellectual Property</h2>
          <p>
            The Services, including all content, trademarks, logos, and software, are owned by or licensed to {company}
            and are protected by applicable intellectual property laws. Except as expressly permitted, you may not copy,
            modify, distribute, sell, or create derivative works based on the Services.
          </p>

          <h2>8. Third-Party Services</h2>
          <p>
            The Services may integrate with third-party services (e.g., payment providers, identity providers). We are
            not responsible for third-party content, terms, or privacy practices. Your use of such services is governed
            by the applicable third-party agreements.
          </p>

          <h2>9. Disclaimers</h2>
          <p>
            THE SERVICES ARE PROVIDED “AS IS” AND “AS AVAILABLE” WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR
            IMPLIED, INCLUDING WITHOUT LIMITATION WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE,
            AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE.
          </p>

          <h2>10. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, {company} AND ITS AFFILIATES, OFFICERS, EMPLOYEES, AGENTS, AND
            SUPPLIERS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE
            DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, OR USE, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE
            SERVICES. OUR TOTAL LIABILITY UNDER THESE TERMS WILL NOT EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID US IN
            THE 6 MONTHS PRECEDING THE CLAIM OR (B) USD $100.
          </p>

          <h2>11. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless {company} and its affiliates, officers, employees, and agents from
            and against any claims, liabilities, damages, losses, and expenses (including reasonable attorneys’ fees)
            arising out of or related to your use of the Services or violation of these Terms.
          </p>

          <h2>12. Termination</h2>
          <p>
            We may suspend or terminate your access to the Services at any time, with or without notice, if we believe
            you have violated these Terms or applicable law. Upon termination, your right to use the Services will cease
            immediately.
          </p>

          <h2>13. Governing Law and Dispute Resolution</h2>
          <p>
            These Terms are governed by the laws of your local jurisdiction, without regard to its conflict of law
            principles. Any disputes arising under these Terms will be resolved in the courts located in our principal
            place of business, unless otherwise required by applicable law.
          </p>

          <h2>14. Changes to These Terms</h2>
          <p>
            We may update these Terms from time to time. The “Last updated” date indicates when the latest changes were
            made. Your continued use of the Services after changes become effective constitutes your acceptance of the
            revised Terms.
          </p>

          <h2>15. Contact Us</h2>
          <p>
            If you have questions about these Terms, please contact us via the details provided on our website or email
            us at the address listed in our <Link href="/privacy">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </>
  )
}
