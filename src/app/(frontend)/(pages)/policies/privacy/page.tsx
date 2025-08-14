import { BlockWrapper } from '@/components/BlockWrapper';
import Link from 'next/link';
import { ContactInfo } from '../ContactInfo';

export default function CookiePolicyPage() {
  return (
    <>
      <BlockWrapper>
        <h1 className="text-hero">Fostering Cents Privacy Policy</h1>
        <p className="text-2xl md:text-3xl mt-2">
          <strong>Effective Date:</strong> April 25, 2025
        </p>
      </BlockWrapper>
      <BlockWrapper className="richText">
        <p>
          Fostering Cents (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) values your privacy.
          This Privacy Policy outlines how we collect, use, and protect your personal information
          when you interact with our website, www.fosteringcents.com (&quot;Site&quot;).
        </p>

        <h3>1. Information We Collect</h3>
        <p>We may collect the following personal information when you:</p>
        <ul>
          <li>Contact us via the contact form or email</li>
          <li>Subscribe to our newsletter</li>
          <li>Leave comments (if enabled)</li>
          <li>Interact with affiliate links or analytics tools</li>
        </ul>
        <p>This may include:</p>
        <ul>
          <li>Your name</li>
          <li>Email address</li>
          <li>IP address</li>
          <li>Any message content you submit</li>
          <li>Browser and device data (via cookies or analytics tools)</li>
        </ul>

        <h3>2. Legal Bases for Processing (for EU Users)</h3>
        <p>
          Under the General Data Protection Regulation (GDPR), we rely on the following legal bases
          to collect and use your personal information:
        </p>
        <ul>
          <li>
            <strong>Consent</strong>: For email newsletters, cookie tracking, and certain analytics.
          </li>
          <li>
            <strong>Legitimate Interests</strong>: To improve our services, respond to inquiries,
            and maintain site security.
          </li>
          <li>
            <strong>Legal Obligation</strong>: Where we are required to comply with a legal
            obligation.
          </li>
        </ul>

        <h3>3. How We Use Your Information</h3>
        <p>We use the information to:</p>
        <ul>
          <li>Respond to inquiries or feedback</li>
          <li>Send newsletters and updates (only if you opt in)</li>
          <li>Improve website content, design, and functionality</li>
          <li>Monitor blog performance using analytics tools</li>
        </ul>
        <p>
          We do <strong>not</strong> sell, rent, or share your personal information with third
          parties for their marketing purposes.
        </p>

        <h3>4. Email Communications (CAN-SPAM Compliance)</h3>
        <p>If you subscribe to our emails:</p>
        <ul>
          <li>You will only receive emails you explicitly opted into.</li>
          <li>Each email will include a clear &quot;unsubscribe&quot; link.</li>
          <li>We honor unsubscribe requests promptly.</li>
        </ul>

        <h3>5. Cookies & Tracking Technologies</h3>
        <p>
          We use cookies and tracking technologies (such as Google Analytics) to understand how
          users interact with our site.
        </p>
        <p>
          <strong>Cookies help us:</strong>
        </p>
        <ul>
          <li>Analyze visitor behavior</li>
          <li>Track affiliate links</li>
          <li>Improve site performance</li>
        </ul>
        <p>
          You can disable cookies in your browser settings. For more information, see our{' '}
          <Link href="cookies">Cookie Policy</Link>.
        </p>

        <h3>6. Third-Party Services & Links</h3>
        <p>
          Our site may include links to third-party sites and may integrate with third-party
          services.
        </p>
        <p>
          We are not responsible for the privacy practices or content of third-party websites.
          Please review their privacy policies.
        </p>

        <h3>7. Data Retention</h3>
        <p>
          We retain contact form submissions and email opt-in data only as long as needed to fulfill
          the purpose it was collected for or as required by law. Unsubscribed users&apos; email
          addresses are deleted or anonymized periodically.
        </p>

        <h3>8. Your Rights (GDPR & Other Jurisdictions)</h3>
        <p>
          If you are located in the European Economic Area (EEA), the UK, or other applicable
          jurisdictions, you have the right to:
        </p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Correct inaccurate information</li>
          <li>Request deletion of your data</li>
          <li>Object to or restrict certain processing</li>
          <li>Withdraw consent at any time</li>
        </ul>
        <p>
          To exercise your rights, email us at{' '}
          <a href="mailto:fosteringcents@gmail.com">fosteringcents@gmail.com</a>.
        </p>
        <p>You may also lodge a complaint with your local data protection authority.</p>

        <h3>9. International Data Transfers</h3>
        <p>
          As we are based in the United States, your data may be transferred and processed outside
          the EU. When doing so, we use appropriate safeguards such as:
        </p>
        <ul>
          <li>Data processing agreements with service providers</li>
        </ul>

        <h3>10. Data Security</h3>
        <p>
          We implement appropriate technical and organizational security measures to protect your
          data against unauthorized access, alteration, disclosure, or destruction. However, no
          method of transmission over the internet is 100% secure.
        </p>

        <h3>11. Children’s Privacy (COPPA Compliance)</h3>
        <p>
          This site is intended for adults, particularly foster parents and caregivers. We do not
          knowingly collect personal information from children under 13. If you believe a child has
          submitted data, please contact us immediately at{' '}
          <a href="mailto:fosteringcents@gmail.com">fosteringcents@gmail.com</a>.
        </p>

        <h3>12. Changes to This Policy</h3>
        <p>
          We may update this Privacy Policy occasionally. We will post the revised version with an
          updated &quot;Effective Date&quot; at the top. We encourage you to review the policy
          periodically.
        </p>

        <h3>13. Contact Information</h3>
        <p>If you have any questions about this policy, contact us at:</p>
        <ContactInfo />
      </BlockWrapper>
    </>
  );
}
