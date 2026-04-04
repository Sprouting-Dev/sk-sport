import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/**
 * Build the remotePatterns list for next/image.
 *
 * Priority:
 *  1. S3_ENDPOINT env var — parsed at build time to extract the exact hostname.
 *  2. Static fallbacks — cover the most common S3-compatible providers so the
 *     app works before credentials are finalised in .env.
 */
function buildImageRemotePatterns() {
  /** @type {import('next').NextConfig['images']['remotePatterns']} */
  const patterns = []

  const endpoint = process.env.S3_ENDPOINT
  if (endpoint) {
    try {
      const { protocol, hostname } = new URL(endpoint)
      patterns.push({
        protocol: /** @type {'http'|'https'} */ (protocol.replace(':', '')),
        hostname,
      })
    } catch {
      // S3_ENDPOINT is set but not a valid URL — skip it silently.
    }
  }

  // Supabase Storage (project already uses Supabase; forcePathStyle matches their S3-compatible API)
  patterns.push({ protocol: 'https', hostname: '**.supabase.co' })

  // Standard AWS S3 (virtual-hosted and path-style)
  patterns.push({ protocol: 'https', hostname: '**.amazonaws.com' })

  // Local development — MinIO or any S3-compatible server on localhost
  patterns.push({ protocol: 'http', hostname: 'localhost' })

  return patterns
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  images: {
    remotePatterns: buildImageRemotePatterns(),
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
}

export default withPayload(withNextIntl(nextConfig), { devBundleServerPackages: false })
