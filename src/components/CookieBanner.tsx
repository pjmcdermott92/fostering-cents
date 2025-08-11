'use client';
import Link from 'next/link';
import { Button } from './ui/button';
import { usePrivacy } from '@/providers/PrivacyProvider';

export function CookieBanner() {
  const { showConsentBanner, updateConsent } = usePrivacy();

  if (!showConsentBanner) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="We Value Your Privacy!"
      className="fixed z-[250] bottom-40 w-full max-w-2xl left-1/2 -translate-x-1/2 bg-white shadow-lg border p-4 mx-2 space-y-4 rounded-md"
    >
      <h3 className="h3-bold">We Value Your Privacy!</h3>
      <p className="text-sm">
        We use cookies to enhance your experience, analyze traffic, and deliver personalized
        content. Some cookies are essential, while others are optional and used for analytics and
        advertising. You can choose which cookies we use. For more details, see our{' '}
        <Link className="text-primary underline hover:no-underline" href="/policies/privacy">
          Privacy Policy
        </Link>{' '}
        and{' '}
        <Link className="text-primary underline hover:no-underline" href="/policies/cookies">
          Cookie Policy
        </Link>
        .
      </p>
      <div className="flex items-center justify-center gap-3">
        <Button onClick={() => updateConsent(true)}>Accept Cookies</Button>
        <Button onClick={() => updateConsent(false)}>Reject Cookies</Button>
      </div>
    </div>
  );
}
