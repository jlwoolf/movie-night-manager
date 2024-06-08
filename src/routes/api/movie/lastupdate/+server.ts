import Movie from '$lib/db/movie';
import sequelize from '$lib/db/sequelize';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET = (async ({}) => {
	
	let movie = await Movie.findOne({
		logging: false,
		order: [['updatedAt', 'DESC']]
	});

	if (!movie) {
		return json({
			lastupdate: null
		});
	}

	return json({
		lastupdate: movie.updatedAt
	});
}) satisfies RequestHandler;
