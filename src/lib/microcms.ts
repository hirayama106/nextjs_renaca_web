import { createClient } from 'microcms-js-sdk';
import type { MicroCMSQueries, MicroCMSImage, MicroCMSDate } from 'microcms-js-sdk';

export type Works = {
	id: string;
	title: string;
	image: MicroCMSImage;
	content?: string;
	url?: string;
	client?: string;
	stacks?: Stacks[];
} & MicroCMSDate;

export type Stacks = {
	id: string;
	title: string;
} & MicroCMSDate;

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
	throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}

if (!process.env.MICROCMS_API_KEY) {
	throw new Error('MICROCMS_API_KEY is required');
}

export const client = createClient({
	serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
	apiKey: process.env.MICROCMS_API_KEY,
});

export const getWorksList = async (queries?: MicroCMSQueries) => {
	const data = await client.getList<Works>({
		endpoint: 'works',
		queries,
	});
	return data;
};

export const getWorksDetail = async (contentId: string, queries?: MicroCMSQueries) => {
	const data = await client.getListDetail<Works>({
		endpoint: 'works',
		contentId,
		queries,
	});
	return data;
};
