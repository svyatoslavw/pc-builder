/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "juysybzgudkzpmibrrvb.supabase.co",
        protocol: "https"
      }
    ]
  }
}

export default nextConfig
