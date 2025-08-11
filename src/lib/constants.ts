export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? 'Fostering Cents';
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ?? 'Where personal finance meets purposeful parenting';
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
export const COOKIE_CONSENT_KEY = process.env.NEXT_PUBLIC_COOKIE_CONSENT_KEY ?? 'fcb_cookieConsent';
export const MOBILE_NAV_SLUG = 'mobile-nav';

// Cloudflare R2
export const R2_ENDPOINT = process.env.R2_ENDPOINT ?? '';
export const R2_ACCESS_KEY = process.env.R2_ACCESS_KEY ?? '';
export const R2_SECRET_KEY = process.env.R2_SECRET_KEY ?? '';
export const R2_BUCKET = process.env.R2_BUCKET ?? '';
export const R2_REGION = process.env.R2_REGION ?? 'auto';
export const R2_CDN_URL = process.env.R2_CDN_URL ?? 'https://cdn.fosteringcents.com/';
