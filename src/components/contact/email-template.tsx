import * as React from 'react';
import { z } from 'zod';
import { formSchema } from '@/components/contact/form';

export function EmailTemplate({ title, name, company, email, tel, url, budget, message }: z.infer<typeof formSchema>) {
	return (
		<div>
			<h1>お問い合わせメール</h1>
			<table>
				<tbody>
					<tr>
						<th>ご相談内容</th>
						<td>{title}</td>
					</tr>
					<tr>
						<th>お名前</th>
						<td>{name}</td>
					</tr>
					<tr>
						<th>企業名</th>
						<td>{company}</td>
					</tr>
					<tr>
						<th>メールアドレス</th>
						<td>{email}</td>
					</tr>
					<tr>
						<th>電話番号</th>
						<td>{tel}</td>
					</tr>
					<tr>
						<th>WebサイトURL</th>
						<td>{url}</td>
					</tr>
					<tr>
						<th>ご予算</th>
						<td>{budget}</td>
					</tr>
					<tr>
						<th>詳しいご相談内容</th>
						<td>{message}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
