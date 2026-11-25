/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["192.168.18.125"],
  images: { formats: ["image/avif", "image/webp"] },
  // Old page addresses keep working.
  async redirects() {
    return [
      { source: "/about", destination: "/advisory", permanent: true },
      { source: "/services", destination: "/advisory", permanent: true },
      { source: "/why-dubai", destination: "/advisory#faq", permanent: true },
    ];
  },
};

export default nextConfig;
