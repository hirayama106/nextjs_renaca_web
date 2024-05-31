import { cn } from '@/lib/utils';

export function Footer() {
	return (
		<footer className={cn('p-8 bg-primary dark:bg-secondary flex justify-center')}>
			<small className={cn('text-white font-alphabet font-bold')}>&copy; Renaca All Rights Reserved.</small>
		</footer>
	);
}
