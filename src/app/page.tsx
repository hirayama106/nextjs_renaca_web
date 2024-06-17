import type { Metadata } from 'next';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table';
import { Heading, HeadingAlphabet, HeadingText } from '@/components/typography/heading';
import { WorksListContainer, WorksListItem } from '@/components/works/list-item';
import { getWorksList } from '@/lib/microcms';

export const metadata: Metadata = {
	title: 'Renaca（リナカ） - 山梨のWeb制作・フロントエンド開発',
	description:
		'Web制作・フロントエンド開発を得意としている山梨県在住のフリーランスWebエンジニアです。お仕事のご依頼などお気軽にお問い合わせください。',
};

export default async function Home() {
	const { contents } = await getWorksList({ limit: 2 });

	return (
		<>
			<section className={cn('bg-secondary pt-32 pb-24 sm:pt-40 sm:pb-32')}>
				<div className='container'>
					<div className={cn('flex flex-col md:flex-row items-center justify-center')}>
						<div>
							<Image src='/images/img_kv.png' width={480} height={480} alt='' />
						</div>
						<div className={cn('grid md:pl-10')}>
							<h1 className={cn('text-5xl lg:text-6xl font-alphabet font-bold tracking-wide flex flex-col gap-2 mb-4')}>
								<span>Good Quality</span>
								<span>Front-End</span>
								<span>Development</span>
							</h1>
							<p className={cn('text-base leading-8 mb-8')}>
								フリーランスで活動しているフロントエンドエンジニアです。
								<br />
								お仕事のご依頼などお気軽にご相談ください。
							</p>
							<Button size='lg' asChild>
								<Link href='/contact/'>お問い合わせはこちら</Link>
							</Button>
						</div>
					</div>
				</div>
			</section>
			<section className={cn('py-24 sm:py-32')}>
				<div className='container'>
					<Heading className={cn('mb-10')}>
						<HeadingAlphabet>Works</HeadingAlphabet>
						<HeadingText>制作実績</HeadingText>
					</Heading>
					{!contents || contents.length === 0 ? (
						<p className={cn('text-sm text-center')}>実績がまだありません</p>
					) : (
						<WorksListContainer>
							{contents.map((item) => {
								return <WorksListItem key={item.id} id={item.id} image={`${item.image.url}?w=1000`} title={item.title} />;
							})}
						</WorksListContainer>
					)}
					<div className={cn('max-w-[440px] pt-12 mx-auto')}>
						<Button size='lg' className={cn('w-full')} asChild>
							<Link href='/works/'>制作実績一覧はこちら</Link>
						</Button>
					</div>
				</div>
			</section>
			<section className={cn('bg-secondary py-24 sm:py-32')}>
				<div className='container'>
					<Heading className={cn('mb-10')}>
						<HeadingAlphabet>Profile</HeadingAlphabet>
						<HeadingText>プロフィール</HeadingText>
					</Heading>
					<div className={cn('flex items-center flex-col sm:flex-row-reverse justify-center gap-6')}>
						<div className={cn('w-[10rem] sm:w-auto bg-background border rounded-full overflow-hidden')}>
							<Image src='/images/icon_hirayama.png' width={250} height={250} alt='' />
						</div>
						<div className={cn('w-full sm:max-w-[420px]')}>
							<div className={cn('mb-6')}>
								<p className={cn('text-sm sm:text-base font-bold mb-2')}>フロントエンドエンジニア</p>
								<p className={cn('text-2xl sm:text-3xl font-bold')}>平山 友之</p>
							</div>
							<dl className={cn('grid gap-4')}>
								<div>
									<dt className={cn('text-sm font-bold mb-1')}>スキル</dt>
									<dd className={cn('text-base')}>HTML / CSS / JavaScript / TypeScript / React / Next.js / WordPress / etc...</dd>
								</div>
								<div>
									<dt className={cn('text-sm font-bold mb-1')}>略歴</dt>
									<dd className={cn('text-base leading-7')}>
										1989年生まれ、山梨県在住。
										<br />
										2014年よりWeb制作会社にエンジニアとして勤務。
										<br />
										2019年1月にフリーランスとして開業。
									</dd>
								</div>
							</dl>
						</div>
					</div>
				</div>
			</section>
			<section className={cn('py-24 sm:py-32')}>
				<div className='container'>
					<Heading className={cn('mb-10')}>
						<HeadingAlphabet>Business</HeadingAlphabet>
						<HeadingText>事業概要</HeadingText>
					</Heading>
					<div className={cn('max-w-screen-md mx-auto border p-6 sm:p-10')}>
						<Table>
							<TableBody>
								<TableRow>
									<TableHead className={cn('w-[7em] sm:w-[10em]')}>屋号</TableHead>
									<TableCell>Renaca（リナカ）</TableCell>
								</TableRow>
								<TableRow>
									<TableHead>事業主</TableHead>
									<TableCell>平山 友之</TableCell>
								</TableRow>
								<TableRow>
									<TableHead>所在地</TableHead>
									<TableCell>山梨県中巨摩郡昭和町</TableCell>
								</TableRow>
								<TableRow>
									<TableHead>創業</TableHead>
									<TableCell>2019年1月</TableCell>
								</TableRow>
								<TableRow>
									<TableHead>事業内容</TableHead>
									<TableCell>
										Webサイト制作・コーディング受託 / Webフロントエンド開発 / Webメディア寄稿・監修 / 講師業 / etc...
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</div>
					<div className={cn('max-w-[440px] pt-12 mx-auto')}>
						<Button size='lg' className={cn('w-full')} asChild>
							<Link href='/contact/'>お問い合わせはこちら</Link>
						</Button>
					</div>
				</div>
			</section>
		</>
	);
}
