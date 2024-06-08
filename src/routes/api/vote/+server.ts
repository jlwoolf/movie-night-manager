import Movie from '$lib/db/movie';
import Vote from '$lib/db/vote';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import crypto from 'node:crypto';

export const POST = (async ({ request, fetch, cookies }) => {
	let voteSession = cookies.get('voteSession');
	if (!voteSession) {
		let date = new Date();
		date.setHours(23, 59, 59, 999);

		voteSession = crypto.randomBytes(32).toString('base64');
		cookies.set('voteSession', voteSession, { path: '/', expires: date });
	}

	let data = await request.json();
	if (!data.type) return error(400, "Type of 'for' or 'against' required to vote.");
	if (!data.movieId) return error(400, 'Movie ID required to vote.');

	let vote = await Vote.findOne({
		where: {
			voter: voteSession,
			MovieId: data.movieId
		}
	});

	let oldType = null;
	let newType = null;
	if (vote) {
		oldType = vote.type;
		newType = data.type == vote.type ? null : data.type;
		await Vote.update(
			{
				type: newType
			},
			{
				where: {
					voter: voteSession,
					MovieId: data.movieId
				}
			}
		);
	} else {
		vote = await Vote.create({
			MovieId: data.movieId,
			voter: voteSession,
			type: data.type
		});
		newType = vote.type;
	}

	let movie = await Movie.findOne({
		where: {
			id: data.movieId
		}
	});

	if (!movie)
		return error(500, "Couldn't find movie to update vote count for. This should not happen.");

	if (oldType == newType) return json({ voteSession });

	if (newType == 'for') {
		movie.for = (movie.for ?? 0) + 1;
	} else if (newType == 'against') {
		movie.against = (movie.against ?? 0) + 1;
	}

	if (oldType == 'for') {
		movie.for = (movie.for ?? 0) - 1;
	} else if (oldType == 'against') {
		movie.against = (movie.against ?? 0) - 1;
	}

	await Movie.update(
		{
			for: movie.for,
			against: movie.against
		},
		{
			where: {
				id: data.movieId
			}
		}
	);

	return json({ voteSession });
}) satisfies RequestHandler;
