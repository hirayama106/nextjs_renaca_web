'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useLenis } from '@studio-freight/react-lenis';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { SquareCheckBig, Loader2 } from 'lucide-react';
import { sendContactForm } from '@/actions/send-contact-form';
import { toast } from 'sonner';
import Link from 'next/link';
import { startProgress, stopProgress } from 'next-nprogress-bar';

const requiredText = z.string().min(1, {
	message: '必須項目です',
});

export const formSchema = z.object({
	title: requiredText,
	name: requiredText,
	company: z.string(),
	email: requiredText.email({ message: '正しいメールアドレスの形式をご入力ください' }),
	tel: z.string(),
	url: z.string(),
	budget: z.string(),
	message: requiredText,
});

export function ContactForm() {
	const [open, setOpen] = useState<boolean>(false);
	const [isSending, setIsSending] = useState<boolean>(false);
	const [success, setSuccess] = useState<boolean>(false);
	const lenis = useLenis();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			name: '',
			company: '',
			email: '',
			tel: '',
			url: '',
			budget: '',
			message: '',
		},
	});
	function onConfirm() {
		setOpen(true);
	}
	async function onSubmit(values: z.infer<typeof formSchema>) {
		startProgress();
		setIsSending(true);
		const closeDialog = () => {
			setOpen(false);
			setIsSending(false);
			stopProgress();
		};
		const data = await sendContactForm(values);
		if (data) {
			toast.success('送信されました');
			closeDialog();
			setSuccess(true);
		} else {
			toast.error('送信に失敗しました');
			closeDialog();
		}
	}

	useEffect(() => {
		if (!lenis) return;
		if (open) {
			lenis.stop();
		} else {
			lenis.start();
		}
	}, [open, lenis]);

	if (success)
		return (
			<div className={cn('grid')}>
				<p className={cn('text-lg font-bold mb-4')}>この度はRenacaにお問い合わせ頂きありがとうございます。</p>
				<p className={cn('text-base leading-8 mb-8')}>
					内容を確認し次第、メールにてご返信させていただきます。
					<br />
					今しばらくお待ちくださいますようお願い申し上げます。
				</p>
				<Button asChild>
					<Link href='/'>ホームへ戻る</Link>
				</Button>
			</div>
		);

	return (
		<>
			<div className={cn('mb-12 border p-8')}>
				<h3 className={cn('text-lg font-bold mb-6')}>Renacaにご相談いただけること</h3>
				<dl className={cn('grid gap-4 mb-6')}>
					<div>
						<dt className={cn('flex items-center gap-2 text-base font-bold mb-1')}>
							<SquareCheckBig className='h-[1.5rem] w-[1.5rem] stroke-primary' />
							<span>Webサイト制作のご相談</span>
						</dt>
						<dd className={cn('text-sm')}>企画からデザイン、コーディング、運用まで一貫しての対応が可能です。</dd>
					</div>
					<div>
						<dt className={cn('flex items-center gap-2 text-base font-bold mb-1')}>
							<SquareCheckBig className='h-[1.5rem] w-[1.5rem] stroke-primary' />
							<span>コーディングのご依頼</span>
						</dt>
						<dd className={cn('text-sm')}>
							制作会社様やフリーランスのWebデザイナー様からのコーディングのご依頼も承っております。静的サイトはもちろん、WordPressを用いたサイト、Next.jsなどのフレームワークを用いたJAMstackサイトの実装にも対応可能です。
						</dd>
					</div>
				</dl>
				<p className={cn('text-xs -indent-[1em] pl-[1em]')}>
					※Renacaは会社組織ではなく個人のエンジニアです。営業メールのような内容のお問い合わせには基本的にはお応えできませんので、予めご了承ください。
				</p>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onConfirm)} className='space-y-6'>
					<FormField
						control={form.control}
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormLabel>ご相談内容（必須）</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='---' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value='Webサイト制作のご相談'>Webサイト制作のご相談</SelectItem>
										<SelectItem value='コーディングのご依頼'>コーディングのご依頼</SelectItem>
										<SelectItem value='その他のご相談'>その他のご相談</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>お名前（必須）</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='company'
						render={({ field }) => (
							<FormItem>
								<FormLabel>企業名</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>メールアドレス（必須）</FormLabel>
								<FormControl>
									<Input type='email' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='tel'
						render={({ field }) => (
							<FormItem>
								<FormLabel>電話番号</FormLabel>
								<FormControl>
									<Input type='tel' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='url'
						render={({ field }) => (
							<FormItem>
								<FormLabel>WebサイトURL</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='budget'
						render={({ field }) => (
							<FormItem>
								<FormLabel>ご予算</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='message'
						render={({ field }) => (
							<FormItem>
								<FormLabel>詳しいご相談内容（必須）</FormLabel>
								<FormControl>
									<Textarea placeholder='' className='resize-y' {...field} />
								</FormControl>
								<FormDescription></FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='submit' className='w-full'>
						上記の内容で送信する
					</Button>
					<AlertDialog open={open} onOpenChange={setOpen}>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>送信してよろしいですか？</AlertDialogTitle>
								<AlertDialogDescription>
									入力内容にお間違いがないかご確認の上、問題がなければ「送信する」ボタンを押してください。
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>キャンセル</AlertDialogCancel>
								{isSending ? (
									<AlertDialogAction disabled>
										<Loader2 className='mr-2 h-4 w-4 animate-spin' />
										送信する
									</AlertDialogAction>
								) : (
									<AlertDialogAction onClick={form.handleSubmit(onSubmit)}>送信する</AlertDialogAction>
								)}
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</form>
			</Form>
		</>
	);
}
