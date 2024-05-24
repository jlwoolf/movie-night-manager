import Movie from '$lib/db/movie';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const POST = (async ({ request, fetch }) => {
	let data = await request.json();

	if (!data.id) return error(400, 'id required to update.');

	let values = {
		for: data.for,
		against: data.against,
		watched: data.watched
	};

	const count = await Movie.update(values, {
		where: {
			id: data.id
		}
	});

	return json(count);
}) satisfies RequestHandler;
