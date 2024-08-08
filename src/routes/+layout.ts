import { base } from '$app/paths';
import type { LayoutLoad } from './$types';

export const load = (async ({ fetch, url }) => {
	const adminRes = await fetch(`${base}/api/admin`, {
		method: 'GET'
	});

	let adminData = await adminRes.json();

	const res = await fetch(`${base}/api/movie/get`, {
		method: 'POST',
		body: JSON.stringify({})
	});

	let data = await res.json();

	return {
		movies: data,
		admin: adminData.admin,
        url: url.pathname
	};
}) satisfies LayoutLoad;
