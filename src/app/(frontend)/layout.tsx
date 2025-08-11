import React from 'react';
import { APP_NAME, APP_DESCRIPTION, SERVER_URL } from '@/lib/constants';
import './styles.css';
import { PrivacyProvider } from '@/providers/PrivacyProvider';
import { Providers } from '@/providers';
import { CookieBanner } from '@/components/CookieBanner';

export const metadata = {
  description: APP_DESCRIPTION,
  title: {
    template: `%s | Fostering Cents`,
    default: APP_NAME,
  },
  metadataBase: new URL(SERVER_URL),
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html lang="en">
      <PrivacyProvider>
        <body>
          <Providers>
            {children}
            <CookieBanner />
          </Providers>
        </body>
      </PrivacyProvider>
    </html>
  );
}
