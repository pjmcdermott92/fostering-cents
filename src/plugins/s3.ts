import {
  R2_ACCESS_KEY,
  R2_BUCKET,
  R2_CDN_URL,
  R2_ENDPOINT,
  R2_REGION,
  R2_SECRET_KEY,
} from '@/lib/constants';
import { s3Storage } from '@payloadcms/storage-s3';

export const r2Plugin = s3Storage({
  collections: {
    media: {
      disablePayloadAccessControl: true,
      generateFileURL: ({ filename }) => {
        return `${R2_CDN_URL}${filename}`;
      },
    },
  },
  bucket: R2_BUCKET,
  config: {
    credentials: {
      accessKeyId: R2_ACCESS_KEY,
      secretAccessKey: R2_SECRET_KEY,
    },
    region: R2_REGION,
    endpoint: R2_ENDPOINT,
    forcePathStyle: true,
  },
});
