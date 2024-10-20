/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        hostname: "juysybzgudkzpmibrrvb.supabase.co",
        protocol: "https"
      },
      {
        hostname: "ui-avatars.com",
        protocol: "https"
      }
    ]
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/my-systems/",
        permanent: true
      }
    ]
  }
}

export default nextConfig
