'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import { useEffect } from 'react';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import { usePathname } from 'next/navigation';
import { AppProgressBar } from 'next-nprogress-bar';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	const lenis = useLenis();
	const pathname = usePathname();
	useEffect(() => {
		if (!lenis || !pathname) return;
		lenis.scrollTo(0, {
			immediate: true,
		});
	}, [pathname, lenis]);

	return (
		<NextThemesProvider {...props}>
			<ReactLenis root options={{ lerp: 0.1 }}>
				{children}
			</ReactLenis>
			<AppProgressBar color='hsl(var(--primary))' options={{ showSpinner: false }} shallowRouting />
		</NextThemesProvider>
	);
}
