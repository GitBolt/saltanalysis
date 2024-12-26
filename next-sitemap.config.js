/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://saltanalysis.com",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/api/*'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://saltanalysis.com/server-sitemap.xml' // for dynamic routes
    ],
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/*']
      }
    ]
  }
}