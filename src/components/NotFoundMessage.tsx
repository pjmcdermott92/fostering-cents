import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export function NotFoundMessage() {
  return (
    <div className="max-w-3xl mx-auto my-6 flex flex-col items-center gap-4 text-center p-4">
      <Image src="/404-image.png" alt="Not Found" width={300} height={275} priority />
      <h4>It looks like the page that you are looking for could not be found.</h4>
      <Link href="/">
        <Button>
          <ChevronLeft />
          Back to Homepage
        </Button>
      </Link>
    </div>
  );
}
