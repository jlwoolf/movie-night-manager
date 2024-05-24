import Movie from '$lib/db/movie';
import { json, error, type RequestHandler } from '@sveltejs/kit';
import { Sequelize, ValidationError } from 'sequelize';

export const GET = ((event) => {
	return json({});
}) satisfies RequestHandler;

export const POST = (async ({ request, ...event }) => {
	let data = await request.json();

	if (!data.title) return error(400, 'Request must include a title.');

	if (!data.image) return error(400, 'Request must include an image url.');

	if (!data.imdbID) return error(400, 'Request must include an imdb id.');

	let findMovie = await Movie.findOne({
		where: {
			imdbID: data.imdbID
		}
	});
    console.log(findMovie);

	if (findMovie != null) {
		return json({
			message: 'Movie already exists',
			...findMovie.dataValues
		});
	}

	try {
		const movie = await Movie.create({
			title: data.title,
			image: data.image,
			imdbID: data.imdbID,
			for: 0,
			against: 0,
			watched: false
		});

		return json({
			message: 'Successfully added movie.',
			...movie.dataValues
		});
	} catch (e: any) {
		if (e instanceof ValidationError && e.name == 'SequelizeUniqueConstraintError')
			return error(400, `Movie with imdb id '${data.imdbID}' already exists.`);

		return error(500, e.message);
	}
}) satisfies RequestHandler;
