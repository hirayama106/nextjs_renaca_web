'use server';

import { resend } from '@/lib/resend';
import { z } from 'zod';
import { formSchema } from '@/components/contact/form';
import { EmailTemplate } from '@/components/contact/email-template';

export async function sendContactForm(form: z.infer<typeof formSchema>) {
	try {
		const data = await resend.emails.send({
			from: `${form.name} <no-reply@renaca.jp>`,
			to: ['contact@renaca.jp'],
			subject: `【お問い合わせフォーム】${form.title}`,
			react: EmailTemplate({ ...form }),
		});
		return data;
	} catch {
		return false;
	}
}
