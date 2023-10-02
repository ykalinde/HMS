import { prisma } from '$lib/database';
import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {

    const session = event.cookies.get('session');


    if(session) {
        const user = await prisma.user.findFirst({where: {id: Number.parseInt(session)}});

        if(user) {
            /* if(user.role == "admin" && event.url.pathname.startsWith('/doctor')) {
                throw redirect(302, '/login');
            } */
        } else {
            throw redirect(302, '/login');
        }
    }

    if (event.url.pathname.startsWith('/') && !session) {

        if (!session) {
            //throw redirect(302, '/login');
        }

        /* const user = await prisma.user.findUnique({
            where: { id: session },
            select: { id: true, email: true }
        });

        if (!user) {
            throw redirect(302, '/login');
        } */

        //event.locals.user = user;
    }

    const response = await resolve(event);
    return response;
}