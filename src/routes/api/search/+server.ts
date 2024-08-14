import { env } from '$env/dynamic/private';
import { API_URL } from '$lib/utils';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST = (async ({ fetch, request }) => {
	const data = await request.json();
	if (env?.VARIANT === 'book') {
		return await fetch(`${API_URL}/search/openlib`, {
			method: 'POST',
			body: JSON.stringify(data)
		});
	}

	return await fetch(`${API_URL}/search/omdb`, {
		method: 'POST',
		body: JSON.stringify(data)
	});
}) satisfies RequestHandler;
