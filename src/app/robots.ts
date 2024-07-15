import { MetadataRoute } from 'next'

import { ENV } from '@/configs/env'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${ENV.DOMAIN}/sitemap.xml`,
  }
}
