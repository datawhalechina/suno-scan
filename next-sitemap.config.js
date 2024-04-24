/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_SITE_URL || 'https://github.com/Light-City/suno_scan',
    generateRobotsTxt: true, // (optional)
    outDir: 'out'
    // ...other options
}