/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  distDir: '../public',
  env: {
    name: "Nam's Kasm Registry",
    description: 'Custom Kasm Workspaces maintained by Nam Pham.',
    icon: '/img/logo.svg',
    listUrl: 'https://nam-h-pham.github.io/nam-kasm-registry/',
    contactUrl: 'https://github.com/Nam-H-Pham/nam-kasm-registry/issues',
  },
  reactStrictMode: true,
  basePath: '/nam-kasm-registry/1.0',
  trailingSlash: true,
  images: {
    unoptimized: true,
  }
}

module.exports = nextConfig
