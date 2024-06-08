import Movie from '$lib/db/movie';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const POST = (async ({ request, fetch }) => {
	let data = await request.json();

	if (!data.id) return error(400, 'id required to remove.');

	const count = await Movie.destroy({
		where: {
			id: data.id
		}
	});

	return json(count);
}) satisfies RequestHandler;
