import Session from "$lib/db/session";
import { error, json, type RequestHandler } from "@sveltejs/kit";
import crypto from 'node:crypto'

export const POST = (async ({ request, cookies }) => {
    let userSession = cookies.get('userSession');
    if (!userSession) {
        userSession = crypto.randomBytes(32).toString('base64');
    }

    let date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    cookies.set('userSession', userSession, { path: '/', expires: date });

    let data = await request.json();

    let session = await Session.findOne({
        where: {
            session: userSession
        }
    })

    if (!session) {
        session = await Session.create({
            session: userSession,
            admin: false
        })
        
        if (!session)
            error(500, "Error creating new session for user.")
    }

    

    return json({

    });
}) satisfies RequestHandler;