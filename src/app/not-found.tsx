import Link from 'next/link';
import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export const metadata: Metadata = {
	title: 'ページが見つかりませんでした | Renaca（リナカ）',
};

export default function NotFound() {
	return (
		<div className='place-self-center'>
			<div className='container'>
				<div className='grid py-16'>
					<h2 className={cn('text-4xl md:text-6xl font-alphabet font-bold tracking-wide mb-4 text-center')}>404 Not Found</h2>
					<div className='flex justify-center py-4'>
						<Image src='/images/img_kv.png' width={340} height={340} alt='' />
					</div>
					<p className={cn('mb-8 text-base')}>
						お探しのページが見つかりませんでした。
						<br />
						ページが削除されたか、URLが間違っている可能性があります。
					</p>
					<Button asChild>
						<Link href='/'>ホームへ戻る</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
