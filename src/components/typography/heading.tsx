import * as React from 'react';

import { cn } from '@/lib/utils';

const Heading = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn('grid gap-2 text-center', className)} {...props} />
));
Heading.displayName = 'Heading';

const HeadingAlphabet = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
	<h2 ref={ref} className={cn('font-alphabet text-5xl font-bold tracking-wider', className)} {...props} />
));
HeadingAlphabet.displayName = 'HeadingAlphabet';

const HeadingText = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
	<p ref={ref} className={cn('text-lg font-bold tracking-wider', className)} {...props} />
));
HeadingText.displayName = 'HeadingText';

export { Heading, HeadingAlphabet, HeadingText };
