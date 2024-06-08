import Vote from '$lib/db/vote';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const POST = (async ({ request }) => {
	let data = await request.json();

	if (!data.movieId) return error(400, 'Movie id required to clear.');

	const count = await Vote.destroy({
		where: {
			MovieId: data.movieId
		}
	});

    console.log(count)

	return json(count);
}) satisfies RequestHandler;
