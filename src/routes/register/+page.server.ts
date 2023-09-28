import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/database';
import bcrypt from "bcrypt";

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
        });

        if(user) {
            return fail(407, {conflict: true});
        }

        const hash = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                email: email,
                password: hash,
                role: "patient"
            }
        });

        throw redirect(303, '/login');
    }
}