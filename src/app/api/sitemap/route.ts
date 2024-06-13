import { ENV } from '@/configs/env'

/* eslint-disable @typescript-eslint/no-var-requires */
const prettier = require('prettier')

export async function GET() {
  /**
   * externalRoutes: 백엔드 서버로 부터 받아옵니다.
   * 해당 프로젝트에 맞게 수정해야하는 부분입니다. 하나 이상의 api 호출이 필요할 수도 있습니다.
   */
  // const { data } = await axios.get('https://api.tagamall.com/api/v1/product/');
  // const externalRoutes = data.map((item: any) => `/items/${item.id}`);

  /**
   * localRoutes와 externalRoutes를 합하여 전체 routes를 구성합니다.
   */
  // const routes = [...localRoutes, ...externalRoutes];

  try {
    const localRoutes = await fetch(`${ENV.DOMAIN}/sitemap.json`).then((it) =>
      it.json(),
    )

    const routes = [...localRoutes]

    const staticPageRoutesMap = routes
      .map((route) => {
        return `
        <url>
          <loc>${ENV.DOMAIN}${route}</loc>
          <lastmod>${new Date()}</lastmod>
        </url>
      `
      })
      .join('')

    const sitemap = `
      <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          ${staticPageRoutesMap}
        </urlset>
  `

    const formatted = prettier.format(sitemap, { parser: 'html' })

    return new Response(formatted, {
      headers: {
        'Content-Type': 'text/xml',
      },
    })
  } catch (error) {
    return new Response('', {
      status: 500,
    })
  }
}
