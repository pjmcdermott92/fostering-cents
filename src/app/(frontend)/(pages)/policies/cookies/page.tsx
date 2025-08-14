import { BlockWrapper } from '@/components/BlockWrapper';
import Link from 'next/link';
import { ContactInfo } from '../ContactInfo';

export default function CookiePolicyPage() {
  return (
    <>
      <BlockWrapper>
        <h1 className="text-hero">Fostering Cents Cookie Policy</h1>
        <p className="text-2xl md:text-3xl mt-2">
          <strong>Effective Date:</strong> April 25, 2025
        </p>
      </BlockWrapper>
      <BlockWrapper className="richText">
        <p>
          This Cookie Policy explains how <strong>Fostering Cents</strong> (&quot;we&quot;,
          &quot;our&quot;, or &quot;us&quot;) uses cookies and similar technologies to recognize you
          when you visit our website at www.fosteringcents.com (&quot;Site&quot;). It explains what
          these technologies are, why we use them, and your rights to control our use of them.
        </p>
        <h3>1. What Are Cookies?</h3>
        <p>
          Cookies are small text files stored on your device (computer, tablet, smartphone) when you
          visit a website. They help websites function properly and efficiently, and may collect
          browsing information for analytics or personalization.
        </p>
        <h3>2. Types of Cookies We Use</h3>
        <p>We use the following categories of cookies:</p>
        <ul>
          <li>
            <strong>Essential Cookies</strong> - These are necessary for the website to function and
            cannot be switched off. They are usually set in response to actions you take (e.g.,
            submitting a contact form).
          </li>
          <li>
            <strong>Performance & Analytics Cookies</strong> - These help us understand how visitors
            interact with our website (e.g., Google Analytics). These cookies do not collect
            personally identifiable information unless you explicitly provide it.
          </li>
          <li>
            <strong>Functional Cookies</strong> - These allow the website to remember choices you
            make (such as your region or language preferences).
          </li>
          <li>
            <strong>Affiliate & Tracking Cookies</strong> - We may use affiliate links which install
            tracking cookies to identify if you clicked a referral link and completed a purchase.
            These cookies are typically set by third-party affiliate networks.
          </li>
        </ul>

        <h3>3. Third-Party Cookies</h3>
        <p>Some cookies may be set by third parties when you visit our site. These may include:</p>
        {/* @TODO: List cookies specifically here */}
        <ul>
          <li>
            <strong>Google Analytics</strong> - Used to measure website traffic and usage (
            <Link
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noreferrer noopener"
            >
              Privacy Policy
            </Link>
            ).
          </li>
        </ul>

        <h3>4. How You Can Control Cookies</h3>
        <p>You have the right to decide whether to accept or reject cookies:</p>
        <ul>
          <li>
            <strong>Cookie Consent Banner</strong>: You will see a banner asking for consent to
            non-essential cookies when you first visit our site, and then every six months after.
          </li>
          <li>
            <strong>Browser Settings</strong>: You can also set your browser to block or alert you
            about cookies. Visit the help section of your browser for guidance.
          </li>
        </ul>
        <p className="italic">
          <strong>NOTE:</strong> Disabling certain cookies may impact your experience on our
          website.
        </p>

        <h3>5. How Long Are Cookies Stored?</h3>
        <p>Cookies may be stored for varying lengths of time:</p>
        <ul>
          <li>
            <strong>Session cookies</strong>: Deleted automatically when you close your browser.
          </li>
          <li>
            <strong>Persistent cookies</strong>: Remain on your device until manually deleted or
            they expire.
          </li>
        </ul>

        <h3>6. Updates to This Policy</h3>
        <p>
          We may update this Cookie Policy to reflect changes in technology or legal requirements.
          Updates will be posted on this page with a revised effective date.
        </p>

        <h3>7. Contact Us</h3>
        <p>If you have any questions about our use of cookies or this policy, please contact:</p>
        <ContactInfo />
      </BlockWrapper>
    </>
  );
}
