/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { canUseDOM } from '@/utilities/canUseDom';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const CONSENT_COOKIE_KEY = 'fcb_cookieConsent';

type CookieConsent = {
  accepted: boolean;
  at: string;
};

type Privacy = {
  cookieConsent?: boolean;
  showConsentBanner?: boolean;
  updateConsent: (accepted: boolean) => void;
};

const Context = createContext<Privacy>({
  cookieConsent: undefined,
  showConsentBanner: undefined,
  updateConsent: () => false,
});

export const usePrivacy = () => useContext(Context);

export function PrivacyProvider({ children }: { children: React.ReactNode }) {
  const [showConsentBanner, setShowConsentBanner] = useState<boolean | undefined>();
  const [cookieConsent, setCookieConsent] = useState<boolean | undefined>();

  const updateConsent = useCallback((accepted: boolean) => {
    setCookieConsent(accepted);
    setConsentCookie(accepted);
    setShowConsentBanner(false);
  }, []);

  useEffect(() => {
    const consent = getConsentCookie();
    if (consent) {
      setCookieConsent(consent.accepted);
      setShowConsentBanner(false);
    } else {
      setShowConsentBanner(true);
    }
  }, []);

  function loadThirdPartyServices() {
    if ((window as any).__thirdPartyInitialized) return;
    (window as any).__thirdPartyInitialized = true;
    // LOAD IN ALL THIRD-PARTY SCRIPTS HERE!
    console.log('Third party scripts loaded');
  }

  useEffect(() => {
    if (cookieConsent) loadThirdPartyServices();
  }, [cookieConsent]);

  return (
    <Context.Provider value={{ cookieConsent, showConsentBanner, updateConsent }}>
      {children}
    </Context.Provider>
  );
}

function getConsentCookie(): CookieConsent | null {
  if (!canUseDOM) return null;
  const value = document.cookie.split('; ').find((row) => row.startsWith(`${CONSENT_COOKIE_KEY}`));
  if (!value) return null;

  try {
    return JSON.parse(decodeURIComponent(value.split('=')[1])) as CookieConsent;
  } catch (err) {
    console.log(err);
    return null;
  }
}

function setConsentCookie(accepted: boolean) {
  if (!canUseDOM) return;
  const consent: CookieConsent = {
    accepted,
    at: new Date().toISOString(),
  };
  const encoded = encodeURIComponent(JSON.stringify(consent));
  document.cookie = `${CONSENT_COOKIE_KEY}=${encoded}; path=/;max-age=${60 * 60 * 24 * 180}; SameSite=Lax`;
}
