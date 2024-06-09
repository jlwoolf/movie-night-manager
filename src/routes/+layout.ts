import { fetchData } from '$lib/utils';
import type { LayoutLoad } from './$types';

export const load = (async (event) => {
	const res = await fetchData(event);
	return {
        ...res,
		url: event.url.pathname
	};
}) satisfies LayoutLoad;
