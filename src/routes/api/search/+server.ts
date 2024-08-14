import { PUBLIC_VARIANT } from '$env/static/public';
import { API_URL } from '$lib/utils';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST = (async ({ fetch, request }) => {
	const data = await request.json();
	if (PUBLIC_VARIANT === 'movie') {
		return await fetch(`${API_URL}/search/omdb`, {
			method: 'POST',
			body: JSON.stringify(data)
		});
	} else if (PUBLIC_VARIANT === 'book') {
		return await fetch(`${API_URL}/search/openlib`, {
			method: 'POST',
			body: JSON.stringify(data)
		});
	}

	return json([]);
}) satisfies RequestHandler;
