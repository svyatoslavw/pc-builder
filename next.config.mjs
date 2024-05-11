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
  }
}

export default nextConfig
