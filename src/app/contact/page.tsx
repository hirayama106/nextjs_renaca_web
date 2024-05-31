import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Heading, HeadingAlphabet, HeadingText } from '@/components/typography/heading';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { ContactForm } from '@/components/contact/form';

export const metadata: Metadata = {
	title: 'お問い合わせ | Renaca（リナカ）',
	description: 'Renacaへのご相談はこちらから',
};

export default function Contact() {
	return (
		<>
			<Breadcrumb className={cn('px-4 md:px-8')}>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href='/'>Home</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Contact</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<section className={cn('pt-12 pb-24 sm:pb-32')}>
				<div className='container'>
					<Heading className={cn('mb-16')}>
						<HeadingAlphabet>Contact</HeadingAlphabet>
						<HeadingText>お問い合わせ</HeadingText>
					</Heading>
					<div className={cn('max-w-screen-sm mx-auto')}>
						<ContactForm />
					</div>
				</div>
			</section>
		</>
	);
}
