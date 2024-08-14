import type { PageServerLoad } from './$types';
import { base } from '$app/paths';
import { env } from '$env/dynamic/private';

export const load = (async ({ fetch }) => {
	const adminRes = await fetch(`${base}/api/admin`, {
		method: 'GET'
	});

	let adminData = await adminRes.json();

	const res = await fetch(`${base}/api/movie/get`, {
		method: 'POST',
		body: JSON.stringify(
			adminData.admin
				? {}
				: {
						watched: false
					}
		)
	});

	let data = await res.json();
	let variant: 'book' | 'movie' = env?.VARIANT === 'book' ? 'book' : 'movie';
	let page_title = env?.PAGE_TITLE ?? 'Movie Night Manager';

	return {
		movies: data,
		admin: adminData.admin,
		variant,
		page_title
	};
}) satisfies PageServerLoad;
