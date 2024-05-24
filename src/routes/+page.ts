import { json } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const res = await fetch('/api/movie/get', {
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
