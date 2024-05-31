import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { getWorksDetail } from '@/lib/microcms';
import { notFound } from 'next/navigation';
import parse from 'html-react-parser';

export async function generateMetadata({ params: { id } }: { params: { id: string } }) {
	const data = await getWorksDetail(id);
	return {
		title: `${data.title} | 制作実績 | Renaca（リナカ）`,
	};
}

export default async function WorkDetail({ params: { id } }: { params: { id: string } }) {
	const data = await getWorksDetail(id);
	if (!data) {
		notFound();
	}
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
						<BreadcrumbPage>
							<Link href='/works/'>Works</Link>
						</BreadcrumbPage>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>{data.title}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<section className={cn('pt-6 pb-24 sm:pb-32')}>
				<div className={cn('bg-secondary py-3 px-1 sm:py-8')}>
					<div className='max-w-screen-xl mx-auto'>
						<Image src={data.image.url} width={data.image.width} height={data.image.height} alt='' />
					</div>
				</div>
				<div className='container'>
					<div className={cn('pt-8 sm:pt-12 max-w-screen-md mx-auto')}>
						<h1 className={cn('text-3xl sm:text-4xl font-bold mb-6 sm:mb-8')}>{data.title}</h1>
						<div className={cn('text-sm sm:text-base space-y-4 mb-12 [&_a]:text-blue-600 [&_a]:dark:text-white [&_a]:underline')}>
							{data.content && parse(data.content)}
						</div>
						<Table className={cn('mb-12')}>
							<TableBody>
								{data.url && (
									<TableRow>
										<TableHead className={cn('w-[10em] sm:w-[15em]')}>URL</TableHead>
										<TableCell>
											<a href={data.url} target='_blank' className={cn('text-blue-600 dark:text-white underline')}>
												{data.url}
											</a>
										</TableCell>
									</TableRow>
								)}
								{data.client && (
									<TableRow>
										<TableHead>クライアント</TableHead>
										<TableCell>{data.client}</TableCell>
									</TableRow>
								)}
								{data.stacks && data.stacks?.length > 0 && (
									<TableRow>
										<TableHead>技術スタック</TableHead>
										<TableCell>
											<div className='flex flex-wrap gap-2'>
												{data.stacks.map((item) => {
													return (
														<Badge key={item.id} variant='outline'>
															{item.title}
														</Badge>
													);
												})}
											</div>
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
						<div className={cn('flex justify-center')}>
							<Button size='lg' variant={'outline'} asChild>
								<Link href='/works/'>一覧に戻る</Link>
							</Button>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
