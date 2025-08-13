import { BlockWrapper } from '../BlockWrapper';
import type { Page } from '@/payload-types';
import { SubscribeForm } from '../SubscribeForm';
import Image from 'next/image';

type Props = Extract<Page['content'], { blockType: 'newsletterForm' }>;

export function NewsletterFormBlock({ newsletterFormFields }: Props) {
  const { settings, padding } = newsletterFormFields;

  return (
    <BlockWrapper settings={settings} padding={padding}>
      <div className="relative bg-charcoal w-full rounded-md text-white p-4 min-h-[300px] overflow-hidden">
        <div className="relative z-10 md:w-1/2 p-4 space-y-5">
          <h2 className="font-bold text-2xl md:text-3xl">
            Bedtime Routines & Budgeting: The Newsletter
          </h2>
          <p>
            Get our newsletter, where we’ll send encouragement, real-life strategies, and the
            occasional GIF of someone crying into a cup of ramen noodles.
          </p>
          <SubscribeForm />
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-full md:w-2/3 select-none pointer-events-none">
          <Image
            src="/kids-art_converted.jpg"
            alt="Kids art"
            fill
            style={{ objectFit: 'cover', objectPosition: 'left center' }}
            className="opacity-75"
          />
        </div>
      </div>
    </BlockWrapper>
  );
}
