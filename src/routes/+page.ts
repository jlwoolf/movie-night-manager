import type { PageLoad } from './$types';
import { base } from '$app/paths';

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

	return {
		movies: data,
		admin: adminData.admin
	};
}) satisfies PageLoad;
