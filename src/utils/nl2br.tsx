import { Fragment } from 'react';

export function nl2br(str: string) {
	if (typeof str !== 'string') {
		return str;
	}
	const text = str.split(/(\n)/).map((t, i) => {
		return <Fragment key={i}>{t.match(/\n/) ? <br /> : t}</Fragment>;
	});
	return text;
}
