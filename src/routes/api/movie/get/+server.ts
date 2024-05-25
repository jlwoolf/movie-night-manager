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
				},
				order: [['createdAt', 'ASC']]
			});
		} else {
			movies = await Movie.findAll({
				order: [['createdAt', 'ASC']]
			});
		}

		let post = movies.map((movie) => movie.dataValues);
		post.sort((a, b) => {
			let diff = (b.for ?? 0) - (b.against ?? 0) - ((a.for ?? 0) - (a.against ?? 0));
			if (diff == 0) return 0;
			return diff;
		});

		return json(post);
	} catch (e: any) {
		return error(500, e.message);
	}
}) satisfies RequestHandler;
