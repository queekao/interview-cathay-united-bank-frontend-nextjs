/** @type {import('next').NextConfig} */
// NOTE: With custom server option you don't need the next.config.js to handle server logics you handle yourself
// const isProd = process.env.NODE_ENV === 'production'
// Setting env as local is not stardard for Next so I use this variable
// const isLocal = process.env.NEXT_PUBLIC_ENV === 'local'
// const isDev = process.env.NODE_ENV === 'development'
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /\.test\.(tsx|ts)$/, // explicitly ignore the test file during building
        loader: 'ignore-loader'
      })
    }
    return config
  }
  // https://nextjs.org/docs/architecture/nextjs-compiler#module-transpilation
  // transpilePackages: ['@mui/x-date-pickers']
}

module.exports = nextConfig
