import Movie from '$lib/db/movie';
import Vote from '$lib/db/vote';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import crypto from 'node:crypto';

export const POST = (async ({ request, fetch, cookies }) => {
	let sessionID = cookies.get('sessionID');
	if (!sessionID) {
		sessionID = crypto.randomBytes(32).toString('base64');
		cookies.set('sessionID', sessionID, { path: '/' });
	}

	let data = await request.json();
	if (!data.type) return error(400, "Type of 'for' or 'against' required to vote.");
	if (!data.movieId) return error(400, 'Movie ID required to vote.');

	const vote = await Vote.findOne({
		where: {
			voter: sessionID,
			MovieId: data.movieId
		}
	});

	if (vote) {
		let count = await Vote.update(
			{
				type: (data.type == vote.dataValues.type ? null : data.type)
			},
			{
				where: {
					voter: sessionID,
					MovieId: data.movieId
				}
			}
		);
	} else {
		let vote = await Vote.create({
			MovieId: data.movieId,
			voter: sessionID,
			type: data.type
		});
	}

	let forVotes = await Vote.findAndCountAll({
		where: {
			MovieId: data.movieId,
			type: 'for'
		}
	});

	let againstVotes = await Vote.findAndCountAll({
		where: {
			MovieId: data.movieId,
			type: 'against'
		}
	});

	let movie = await Movie.update(
		{
			for: forVotes.count,
			against: againstVotes.count
		},
		{
			where: {
				id: data.movieId
			}
		}
	);

	return json({ sessionID });
}) satisfies RequestHandler;
