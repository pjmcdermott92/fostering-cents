import { BlockWrapper } from '@/components/BlockWrapper';
import Link from 'next/link';
import { ContactInfo } from '../ContactInfo';

export default function CookiePolicyPage() {
  return (
    <>
      <BlockWrapper>
        <h1 className="text-hero">Fostering Cents Terms of Use</h1>
        <p className="text-2xl md:text-3xl mt-2">
          <strong>Effective Date:</strong> April 25, 2025
        </p>
      </BlockWrapper>
      <BlockWrapper className="richText">
        <p>
          Welcome to Fostering Cents (“we,” “us,” or “our”). By accessing or using our website,
          www.fosteringcents.com (the “Site”), you agree to be bound by these Terms of Use
          (“Terms”). If you do not agree to these Terms, please do not use the Site.
        </p>

        <h3>1. Use of the Site</h3>
        <p>
          You agree to use the Site for lawful purposes only and in a way that does not infringe on
          the rights of, restrict, or inhibit anyone else’s use and enjoyment of the Site. You are
          responsible for any content you post or submit and must not:
        </p>
        <ul>
          <li>Violate any applicable laws or regulations;</li>
          <li>Infringe on the intellectual property or privacy rights of others;</li>
          <li>Transmit any harmful or disruptive code or spam.</li>
        </ul>
        <p>
          We reserve the right to terminate or restrict your access to the Site at our discretion if
          we believe your use violates these Terms.
        </p>

        <h3>2. Content Disclaimer</h3>
        <p>
          All content provided on this Site is for informational and educational purposes only. The
          information reflects personal opinions and experiences and is not intended as professional
          advice.
        </p>
        <p>
          <strong>No Professional Advice</strong>: We are not licensed accountants, financial
          advisors, therapists, attorneys, or child development experts. Any insights related to
          finances, parenting, or mental health are personal and should not be relied upon as a
          substitute for advice from qualified professionals.
        </p>
        <p>
          Users are encouraged to seek professional consultation before making decisions involving
          legal, financial, or mental health matters.
        </p>

        <h3>3. Intellectual Property Rights</h3>
        <p>
          Unless otherwise stated, all content on this Site—including but not limited to text,
          images, logos, graphics, and layout—is the property of Fostering Cents and is protected by
          U.S. and international copyright and intellectual property laws.
        </p>
        <p>
          You may not reproduce, distribute, display, modify, or create derivative works from any
          part of the Site without our express written permission.
        </p>

        <h3>4. User Conduct</h3>
        <p>You agree not to engage in any of the following prohibited activities:</p>
        <ul>
          <li>Submitting false, misleading, or defamatory content;</li>
          <li>Using the Site or contact forms for spam, advertising, or malicious purposes;</li>
          <li>Attempting to gain unauthorized access to the Site or its systems;</li>
          <li>Uploading or distributing viruses, malware, or any other harmful software.</li>
        </ul>

        <h3>5. Affiliate Disclosure</h3>
        <p>
          Some posts or pages may contain affiliate links. This means we may earn a small
          commission—at no additional cost to you—if you make a purchase through those links. We
          only promote products or services we genuinely find valuable and relevant.
        </p>

        <h3>6. No Warranty</h3>
        <p>
          The Site and its content are provided “as is” and “as available.” We make no warranties,
          express or implied, regarding the accuracy, completeness, reliability, or suitability of
          the information provided.
        </p>
        <p>
          We do not guarantee that the Site will be available uninterrupted or free from errors or
          viruses.
        </p>

        <h3>7. Limitation of Liability</h3>
        <p>
          To the fullest extent permitted by law, Fostering Cents and its authors shall not be
          liable for any direct, indirect, incidental, consequential, or punitive damages arising
          from or related to your use of the Site, reliance on its content, or use of any linked
          third-party services or products.
        </p>

        <h3>8. Indemnification</h3>
        <p>
          You agree to defend, indemnify, and hold harmless Fostering Cents, its owners,
          contributors, and affiliates from any claims, liabilities, damages, or expenses arising
          out of your use or misuse of the Site or violation of these Terms.
        </p>

        <h3>9. Changes to These Terms</h3>
        <p>
          We reserve the right to modify or update these Terms at any time without prior notice. Any
          changes will be effective immediately upon posting on the Site. Your continued use of the
          Site constitutes acceptance of the revised Terms.
        </p>

        <h3>10. Governing Law</h3>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of the State of
          Arizona, without regard to its conflict of law provisions.
        </p>

        <h3>11. Contact Information</h3>
        <p>If you have questions about these terms, please contact:</p>
        <ContactInfo />
      </BlockWrapper>
    </>
  );
}
