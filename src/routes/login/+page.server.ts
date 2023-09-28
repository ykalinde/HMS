import { prisma } from '$lib/database';
import { fail, redirect } from '@sveltejs/kit';
import * as bcrypt from "bcrypt";
import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData();

        const email = data.get('email')?.toString();
        const password = data.get('password')?.toString();

        if (!email || !password) {
            return fail(401, { invalid: true });
        }

        const user = await prisma.user.findUnique({
            where: { email: email }
        })
        const person = await prisma.user.findFirstOrThrow({

        })

        if (!user) {
            return fail(400, { credentials: true })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return fail(400, { credentials: true })
        }

        cookies.set('session', user.id, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 30, // set cookie to expire after a month
        });

        if (user.role == "admin"){
            throw redirect(302, '/admin') 
        }

        // redirect the user
        throw redirect(302, '/')
    }
}