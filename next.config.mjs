/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Exporta o site como HTML/CSS/JS estático na pasta `out/`
  // (ideal para Cloudflare Pages / qualquer host estático)
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
