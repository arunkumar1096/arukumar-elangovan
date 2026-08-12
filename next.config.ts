import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => [
    {
      source: "/proof",
      destination: "/case-study/Merlin-AI",
      permanent: true,
    },
    {
      source: "/proof-ops",
      destination: "/case-study/proof-ops",
      permanent: true,
    },
    {
      source: "/userwise",
      destination: "/case-study/video-script-editor",
      permanent: true,
    },
  ],
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=()",
        },
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
        {
          key: "Content-Security-Policy",
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://va.vercel-scripts.com",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: blob: https://substackcdn.com https://substack-post-media.s3.amazonaws.com",
            "font-src 'self'",
            "connect-src 'self' https://www.google-analytics.com https://va.vercel-scripts.com",
            "frame-src https://www.youtube.com https://www.figma.com https://player.vimeo.com",
            "frame-ancestors 'none'",
          ].join("; "),
        },
      ],
    },
  ],
};

export default nextConfig;
