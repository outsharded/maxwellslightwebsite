/** @type {import('next').NextConfig} */
const nextConfig = {}
const withOptimizedImages = require('next-optimized-images')

module.exports = nextConfig
module.exports = withOptimizedImages({})
module.exports = {
    env: {
      SYSUSER: process.env.SYSUSER,
      SYSPASS: process.env.SYSPASS,
    },
  };