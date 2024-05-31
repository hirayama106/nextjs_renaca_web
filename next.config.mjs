/** @type {import('next').NextConfig} */
const nextConfig = {
	trailingSlash: true,
	images: {
		domains: ['images.microcms-assets.io'],
	},
	webpack: (config) => {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		});
		return config;
	},
};

export default nextConfig;
