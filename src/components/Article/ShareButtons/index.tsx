'use client';
import { Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../../ui/button';
import { FacebookIcon } from './icons/FacebookIcon';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { MailIcon } from './icons/MailIcon';
import { TwitterXIcon } from './icons/TwitterXIcon';

export function ShareButtons({ title }: { title: string }) {
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(`${window.location.origin}${pathname}`);
    }
  }, [pathname]);

  useEffect(() => {});

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const platforms = [
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: FacebookIcon,
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/shareArticle?url=${encodedUrl}&title=${encodedTitle}`,
      icon: LinkedInIcon,
    },
    {
      name: 'X',
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: TwitterXIcon,
    },
    {
      name: 'Email',
      url: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
      icon: MailIcon,
    },
  ];

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 pb-4 -space-y-8">
      <p className="text-lg font-bold">Share this Article:</p>
      <div className="flex gap-1 mt-6 relative items-center">
        {platforms.map(({ name, url, icon: Icon }) => (
          <Link href={url} target="_blank" key={name}>
            <Button
              variant="outline"
              aria-label="Copy link"
              title={name === 'Email' ? 'Email link' : `Share on ${name}`}
              className="rounded-full size-10"
            >
              <Icon />
            </Button>
          </Link>
        ))}

        <Button
          onClick={handleCopy}
          variant="outline"
          aria-label="Copy link"
          title="Copy link"
          className="rounded-full"
        >
          <LinkIcon className="size-5" /> Copy Link
        </Button>
        {copied && <span className="text-xs text-gray-800">Link copied!</span>}
      </div>
    </div>
  );
}
