import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Heading, HeadingAlphabet, HeadingText } from '@/components/typography/heading';
import { getWorksList } from '@/lib/microcms';
import { WorksList, worksPerPage } from '@/components/works/list';

export const metadata: Metadata = {
	title: '制作実績 | Renaca（リナカ）',
	description: 'Renacaの制作実績の一覧ページです。',
};

export default async function Works() {
	const { contents, totalCount } = await getWorksList({ limit: worksPerPage });

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
						<BreadcrumbPage>Works</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<section className={cn('pt-12 pb-24 sm:pb-32')}>
				<div className='container'>
					<Heading className={cn('mb-16')}>
						<HeadingAlphabet>Works</HeadingAlphabet>
						<HeadingText>制作実績</HeadingText>
					</Heading>
					{!contents || contents.length === 0 ? (
						<p className={cn('text-sm text-center')}>実績がまだありません</p>
					) : (
						<WorksList contents={contents} totalCount={totalCount} currentPage={1} />
					)}
				</div>
			</section>
		</>
	);
}
