import Movie from '$lib/db/movie';
import Vote from '$lib/db/vote';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import crypto from 'node:crypto';

export const POST = (async ({ request, fetch, cookies }) => {
	let voteSession = cookies.get('voteSession');
	if (!voteSession) {
		let date = new Date();
		date.setHours(23,59,59,999);

		voteSession = crypto.randomBytes(32).toString('base64');
		cookies.set('voteSession', voteSession, { path: '/', expires: date });
	}

	let data = await request.json();
	if (!data.type) return error(400, "Type of 'for' or 'against' required to vote.");
	if (!data.movieId) return error(400, 'Movie ID required to vote.');

	const vote = await Vote.findOne({
		where: {
			voter: voteSession,
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
					voter: voteSession,
					MovieId: data.movieId
				}
			}
		);
	} else {
		let vote = await Vote.create({
			MovieId: data.movieId,
			voter: voteSession,
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

	return json({ voteSession });
}) satisfies RequestHandler;
