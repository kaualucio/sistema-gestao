const withTM = require('next-transpile-modules')(['@loomhq/lens'])
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true
}

module.exports = withTM({ nextConfig })
