import { prisma } from '$lib/database';
import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {

    const session = event.cookies.get('session');

    // checking if the admin port is really loggined in by admin user
    if (event.url.pathname.startsWith('/admin')) {

        if (session) {
            const user = await prisma.user.findFirst({where: {id: Number.parseInt(session)}});

            if(user) {
                if(user.role != "admin") {
                    throw redirect(302, '/login');
                } else {
                    event.locals.user = user;
                }
            } else {
                throw redirect(302, '/login');
            }
            
        } else  {
            throw redirect(302, '/login');
        }
    }

    // checking if the nurse port is really loggined in by a nurse
    if (event.url.pathname.startsWith('/nurse')) {

        if (session) {
            const user = await prisma.user.findFirst({where: {id: Number.parseInt(session)}});

            if(user) {
                if(user.role != "nurse") {
                    throw redirect(302, '/login');
                } else {
                    event.locals.user = user;
                }
            } else {
                throw redirect(302, '/login');
            }
            
        } else  {
            throw redirect(302, '/login');
        }
    }

    // checking if the doctors port is really loggined in by a doctor
    if (event.url.pathname.startsWith('/doctor')) {

        if (session) {
            const user = await prisma.user.findFirst({where: {id: Number.parseInt(session)}});

            if(user) {
                if(user.role != "doctor") {
                    throw redirect(302, '/login');
                } else {
                    event.locals.user = user;
                }
            } else {
                throw redirect(302, '/login');
            }
            
        } else  {
            throw redirect(302, '/login');
        }
    }

    const response = await resolve(event);
    return response;
}