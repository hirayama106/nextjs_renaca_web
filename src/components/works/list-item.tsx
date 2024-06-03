import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { forwardRef } from 'react';

export const WorksListContainer = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn('grid grid-cols-2 gap-x-2 sm:gap-x-4 md:gap-x-6 gap-y-8', className)} {...props} />
));
WorksListContainer.displayName = 'WorksListContainer';

type WorksListItemType = {
	id: string;
	image: string;
	title: string;
};

export function WorksListItem({ id, image, title }: WorksListItemType) {
	return (
		<div className='space-y-3'>
			<Button asChild={true} className={cn('bg-secondary hover:bg-primary p-2 sm:p-3 md:p-6 h-auto border')}>
				<Link href={`/works/${id}/`}>
					<Image src={image} width={1000} height={583} alt='' />
				</Link>
			</Button>
			<h3 className={cn('text-sm sm:text-base md:text-lg font-bold')}>{title}</h3>
		</div>
	);
}
