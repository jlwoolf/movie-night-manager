import { ADMIN_PASSWORD } from '$env/static/private';
import Session from '$lib/db/session';
import { error, json, type Cookies, type RequestHandler } from '@sveltejs/kit';
import crypto from 'node:crypto';

let getSession = async (cookies: Cookies) => {
	let userSession = cookies.get('userSession');
	if (!userSession) {
		userSession = crypto.randomBytes(32).toString('base64');
	}

	let date = new Date();
	date.setFullYear(date.getFullYear() + 1);
	cookies.set('userSession', userSession, { path: '/', expires: date });

	let session = await Session.findOne({
		where: {
			session: userSession
		}
	});

	if (!session) {
		session = await Session.create({
			session: userSession,
			admin: false
		});

		if (!session) return null;
	}

	return session;
};

export const GET = (async ({ request, cookies }) => {
	let session = await getSession(cookies);
	if (!session) return error(500, 'Error fetching a new or existing user session');

	return json({
		admin: session.admin
	});
}) satisfies RequestHandler;

export const POST = (async ({ request, cookies }) => {
	let session = await getSession(cookies);
	if (!session) return error(500, 'Error fetching a new or existing user session');

	let data = await request.json();
	if (!('admin' in data))
		return json({
			admin: session.admin
		});

	if (data.admin == true && session.admin == true)
		return json({
			admin: true
		});

	if (data.admin == false && session.admin == true) {
		await Session.update(
			{
				admin: false
			},
			{
				where: {
					session: session.session
				}
			}
		);
		return json({
			admin: false
		});
	}

	if (!data.password) return error(400, 'Please provide a password.');

	if (data.password == ADMIN_PASSWORD) {
		await Session.update(
			{
				admin: true
			},
			{
				where: {
					session: session.session
				}
			}
		);
		return json({
			admin: true
		});
	} else {
		return error(403, 'Invalid password.');
	}
}) satisfies RequestHandler;
