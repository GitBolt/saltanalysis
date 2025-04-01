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
      'https://saltanalysis.com/server-sitemap.xml'
    ],
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/*']
      }
    ]
  },
  transform: async (config, path) => {
    // Custom priority and changefreq for different types of pages
    let priority = 0.7;
    let changefreq = 'weekly';

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path.startsWith('/salt/')) {
      priority = 0.9;
      changefreq = 'monthly';
    } else if (path.startsWith('/category/')) {
      priority = 0.8;
      changefreq = 'weekly';
    }

    // Add lastmod date
    const lastmod = new Date().toISOString();

    return {
      loc: path,
      changefreq,
      priority,
      lastmod,
      alternateRefs: config.alternateRefs ?? [],
    }
  },
}