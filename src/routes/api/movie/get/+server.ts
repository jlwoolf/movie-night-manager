import Movie from '$lib/db/movie';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const POST = (async ({ request }) => {
	try {
		let data: { watched?: boolean } = await request.json();

		let movies: Movie[] = [];
		if (data.watched == true || data.watched == false) {
			movies = await Movie.findAll({
				where: {
					watched: data.watched
				}
			});
		} else {
			movies = await Movie.findAll();
		}

		return json(movies.map((movie) => movie.dataValues));
	} catch (e: any) {
		return error(500, e.message);
	}
}) satisfies RequestHandler;
