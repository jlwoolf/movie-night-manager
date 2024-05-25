import type { PageLoad } from './$types';
import { base } from '$app/paths';

export const load = (async ({ fetch }) => {
	const res = await fetch(`${base}/api/movie/get`, {
		method: 'POST',
		body: JSON.stringify({
			watched: false
		})
	});

	let data = await res.json();

	return {
		movies: data
	};
}) satisfies PageLoad;
