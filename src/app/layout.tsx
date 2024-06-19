import './globals.css';
import { Rubik, Noto_Sans_JP } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/sonner';
import { GoogleAnalytics } from '@next/third-parties/google';

const rubik = Rubik({
	subsets: ['latin'],
	variable: '--font-alphabet',
});
const notoSansJp = Noto_Sans_JP({
	subsets: ['latin'],
	variable: '--font-sans',
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='ja' suppressHydrationWarning>
			<body className={cn('font-sans antialiased bg-background', notoSansJp.variable, rubik.variable)}>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
					<div className='min-h-screen flex flex-col'>
						<Header />
						<main className='flex-grow'>{children}</main>
						<Footer />
					</div>
					<Toaster richColors />
				</ThemeProvider>
				{!!process.env.GOOGLE_ANALYTICS_ID && <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID} />}
			</body>
		</html>
	);
}
