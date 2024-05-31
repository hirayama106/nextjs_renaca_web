'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { Moon, Sun, Menu } from 'lucide-react';
import Logo from '@/assets/svg/logo.svg';
import LogoDark from '@/assets/svg/logo-dark.svg';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useMediaQuery } from '@/hooks/use-media-query';

export function Header() {
	const { theme, systemTheme, setTheme } = useTheme();
	const toggleTheme = () => {
		if (theme === 'system') {
			if (systemTheme === 'dark') {
				setTheme('light');
			} else if (systemTheme === 'light') {
				setTheme('dark');
			}
		} else {
			if (theme === 'dark') {
				setTheme('light');
			} else if (theme === 'light') {
				setTheme('dark');
			}
		}
	};
	const isDesktop = useMediaQuery('(min-width: 768px)');
	const pathname = usePathname();
	const position = pathname === '/' ? 'fixed md:absolute' : 'sticky md:relative';

	return (
		<header className={cn(position, 'top-0 w-full px-4 md:px-8 py-6 md:py-8 z-50')}>
			<div className={cn('w-full flex items-center justify-between')}>
				<Button asChild={true} className={cn('bg-transparent hover:bg-transparent p-0 h-auto')}>
					<Link href='/'>
						<Logo className='w-[145px] md:w-[164px] h-[42px] md:h-[48px] block dark:hidden' />
						<LogoDark className='w-[145px] md:w-[164px] h-[42px] md:h-[48px] hidden dark:block' />
					</Link>
				</Button>
				<div className={cn('flex items-center')}>
					<div className='hidden md:block'>
						<NavigationMenu>
							<NavigationMenuList className='font-alphabet font-semibold'>
								<NavigationMenuItem>
									<Link href='/' legacyBehavior passHref>
										<NavigationMenuLink className={cn(navigationMenuTriggerStyle())}>Home</NavigationMenuLink>
									</Link>
								</NavigationMenuItem>
								<NavigationMenuItem>
									<Link href='/works/' legacyBehavior passHref>
										<NavigationMenuLink className={navigationMenuTriggerStyle()}>Works</NavigationMenuLink>
									</Link>
								</NavigationMenuItem>
								<NavigationMenuItem>
									<Link href='/contact/' legacyBehavior passHref>
										<NavigationMenuLink className={navigationMenuTriggerStyle()}>Contact</NavigationMenuLink>
									</Link>
								</NavigationMenuItem>
								<NavigationMenuItem>
									<NavigationMenuLink
										href='https://github.com/hirayama106'
										target='_blank'
										className={navigationMenuTriggerStyle()}
									>
										GitHub
									</NavigationMenuLink>
								</NavigationMenuItem>
							</NavigationMenuList>
						</NavigationMenu>
					</div>
					<div className='flex gap-2 ml-4'>
						<Button variant='outline' size='icon' onClick={toggleTheme}>
							<Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
							<Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
							<span className='sr-only'>Toggle theme</span>
						</Button>
						{!isDesktop && isDesktop !== null && (
							<DropdownMenu modal={false}>
								<DropdownMenuTrigger asChild>
									<Button variant='outline' size='icon'>
										<Menu className='h-[1.4rem] w-[1.4rem]' />
										<span className='sr-only'>Toggle menu</span>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align='end'>
									<DropdownMenuItem className='font-alphabet font-semibold cursor-pointer' asChild>
										<Link href='/'>Home</Link>
									</DropdownMenuItem>
									<DropdownMenuItem className='font-alphabet font-semibold cursor-pointer' asChild>
										<Link href='/works/'>Works</Link>
									</DropdownMenuItem>
									<DropdownMenuItem className='font-alphabet font-semibold cursor-pointer' asChild>
										<Link href='/contact/'>Contact</Link>
									</DropdownMenuItem>
									<DropdownMenuItem className='font-alphabet font-semibold cursor-pointer' asChild>
										<Link href='https://github.com/hirayama106' target='_blank'>
											GitHub
										</Link>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						)}
					</div>
				</div>
			</div>
		</header>
	);
}
