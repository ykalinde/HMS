import { prisma } from '$lib/database';
import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {

    const session = event.cookies.get('session');

    if (event.url.pathname.startsWith('/admin')) {

        if (!session) {
            throw redirect(302, '/login');
        }

        const user = await prisma.user.findUnique({
            where: { id: session },
            select: { id: true, email: true }
        });

        if (!user) {
            throw redirect(302, '/login');
        }

        event.locals.user = user;
    }

    const response = await resolve(event);
    return response;
}