import { BlockWrapper } from '@/components/BlockWrapper';
import Link from 'next/link';
import { ContactInfo } from '../ContactInfo';

export default function CookiePolicyPage() {
  return (
    <>
      <BlockWrapper>
        <h1 className="text-hero">Disclaimers & Ethics</h1>
        <p className="text-2xl md:text-3xl mt-2">
          <strong>Effective Date:</strong> April 25, 2025
        </p>
      </BlockWrapper>
      <BlockWrapper className="richText">
        <p>
          At Fostering Cents, we strive to share helpful, honest, and compassionate content around
          foster care, personal finance, and everyday family life. In doing so, we are committed to
          transparency, ethical storytelling, and respecting the privacy of others. Please review
          the following disclaimers to better understand how we approach these topics.
        </p>

        <h3 id="storyImage">Story & Image Disclaimer</h3>
        <p>
          Many of the stories and examples shared on this site are based on real experiences in
          foster care and family life. To protect the privacy and dignity of children and families:
        </p>
        <ul>
          <li>
            Names, identifying details, and locations have been changed unless explicitly stated
            otherwise.
          </li>
          <li>
            Any resemblance to actual persons, living or deceased, is purely coincidental unless
            express permission has been granted.
          </li>
          <li>
            No sensitive or confidential information about children in foster care—past or
            present—is ever shared without appropriate legal consent.
          </li>
        </ul>
        <p>
          We are committed to maintaining high ethical standards, including trauma-informed
          storytelling, respect for confidentiality, and upholding the dignity of all individuals
          mentioned.
        </p>

        <h3 id="professionalAdvice">Not Professional Advice</h3>
        <p>
          All content provided on this blog is for general informational and educational purposes
          only. It does <strong>not</strong> constitute:
        </p>
        <ul>
          <li>Legal advice</li>
          <li>Medical advice</li>
          <li>Marital advice</li>
          <li>Financial advice</li>
          <li>Metal health or therapeutic advice</li>
        </ul>
        <p>
          The views expressed are personal opinions based on our own experiences. Laws and
          regulations—especially those involving foster care—can vary greatly by state,
          jurisdiction, or country. Always consult with a qualified attorney, licensed therapist,
          medical provider, financial advisor, or child welfare professional for guidance tailored
          to your situation.
        </p>

        <h3 id="affiliate">Affiliate/Monetization Disclosure</h3>
        <p>
          Some blog posts may contain affiliate links, meaning we may earn a small commission if you
          click a link and make a qualifying purchase—at <strong>no additional cost to you</strong>.
        </p>
        <p>
          We only recommend products or services we personally use, believe in, or have thoroughly
          researched. Affiliate partnerships help support the mission and maintenance of this site,
          allowing us to continue creating meaningful, helpful content.
        </p>

        <h3 id="testimonials">Testimonials & Personal Experience</h3>
        <p>
          Throughout this blog, we share our personal stories and opinions as foster parents. These
          testimonials reflect <strong>individual perspectives</strong> and are not meant to suggest
          a one-size-fits-all experience with foster care or parenting.
        </p>
        <p>
          Every family’s journey is different. Outcomes and experiences can vary widely. Please
          consult trusted professionals for advice tailored to your unique circumstances.
        </p>

        <h3 id="guestContent">Guest Author Content Disclaimer</h3>
        <p>
          From time to time, we may feature content written by guest authors. The views,
          experiences, and opinions expressed in these guest posts are those of the individual
          authors and do not necessarily reflect the views of Fostering Cents or its primary
          contributors.
        </p>
        <p>
          While we strive to ensure all guest content aligns with our mission and values, we cannot
          guarantee the accuracy, completeness, or suitability of any guest-submitted information.
          Each author is responsible for the content they provide.
        </p>
        <p>
          Guest posts are for informational purposes only and should not be considered legal,
          medical, financial, or mental health advice. Always seek the guidance of qualified
          professionals for your specific needs or situation.
        </p>

        <h3 id="artificialIntelligence">AI-Assisted Writing Disclaimer</h3>
        <p>
          Some of the content on this blog may be supported by artificial intelligence (AI) tools.
          These tools may assist in generating ideas, improving writing, or enhancing clarity.
          However, the views, experiences, and insights shared on this site are still shaped by our
          personal experiences and values.
        </p>
        <p>
          We strive to ensure that all AI-assisted content adheres to our commitment to honesty,
          integrity, and accuracy. We always review and edit AI-generated content to ensure it
          aligns with our ethical standards and mission.
        </p>

        <hr />
        <p>
          Thank you for being part of this community. We deeply value honesty, integrity, and
          responsible storytelling. If you have any questions about our disclosures or content, feel
          free to <Link href="/contact">contact us</Link>.
        </p>
      </BlockWrapper>
    </>
  );
}
