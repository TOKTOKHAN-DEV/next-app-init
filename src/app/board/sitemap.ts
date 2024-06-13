import { MetadataRoute } from 'next'

import { ENV } from '@/configs/env'

/**
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap#generating-multiple-sitemaps
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  // const start = id * 50000
  // const end = start + 50000
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    if (response.ok) {
      const boards = (await response.json()) as {
        userId: number
        id: number
        title: string
        body: string
      }[]
      return boards.map(({ id }) => ({
        url: `${ENV.DOMAIN}/board/${id}`,
      }))
    } else {
      console.log('boards fetch failed with status:', response.status)
    }
  } catch (error) {
    console.error('Error during boards fetch:', error)
  }

  return []
}
