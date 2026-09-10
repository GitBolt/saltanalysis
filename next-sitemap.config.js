/** @type {import('next-sitemap').IConfig} */
const FEATURED_SALTS = new Set([
  "/salt/nh_4|cl/analysis",
  "/salt/pb|ch_3coo/analysis",
  "/salt/nh_4|co_3/analysis",
  "/salt/nh_4|so_4/analysis",
  "/salt/al|so_4/analysis",
  "/salt/pb|no_3/analysis",
  "/salt/zn|so_4/analysis",
  "/salt/ba|cl/analysis",
  "/salt/al|no_3/analysis",
  "/salt/cu|so_4/analysis",
  "/salt/mg|so_4/analysis",
  "/salt/pb|cl/analysis",
  "/salt/sr|cl/analysis",
  "/salt/ba|no_3/analysis",
  "/salt/ca|co_3/analysis",
  "/salt/zn|cl/analysis",
  "/salt/nh_4|c_2o_4/analysis",
  "/salt/ba|br/analysis",
]);

module.exports = {
  siteUrl: "https://saltanalysis.com",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  autoLastmod: true,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/api/*", "/salt/*/flow"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/*"],
      },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
    ],
  },
  transform: async (config, path) => {
    let priority = 0.7;
    let changefreq = "weekly";

    if (path === "/") {
      priority = 1.0;
      changefreq = "daily";
    } else if (
      path === "/how-to-do-salt-analysis" ||
      path === "/viva" ||
      path === "/lab"
    ) {
      priority = 0.95;
      changefreq = "weekly";
    } else if (path === "/quiz") {
      priority = 0.85;
      changefreq = "weekly";
    } else if (FEATURED_SALTS.has(path)) {
      priority = 0.95;
      changefreq = "weekly";
    } else if (path.startsWith("/salt/")) {
      priority = 0.8;
      changefreq = "monthly";
    } else if (path.includes("Additional")) {
      priority = 0.4;
      changefreq = "monthly";
    } else if (path.startsWith("/category/")) {
      priority = 0.75;
      changefreq = "weekly";
    }

    return {
      loc: encodeURI(path),
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      changefreq,
      priority,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
