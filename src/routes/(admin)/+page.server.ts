import { prisma } from '$lib/database';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {
        nurses: await prisma.user.findMany({ where: { role: "nurse" } }),
        doctors: await prisma.user.findMany({ where: { role: "doctor" } }),
        patients: await prisma.user.findMany({ where: { role: "doctor" } })
    };
}) satisfies PageServerLoad;

export const actions = {
    logout: async ({ cookies }) => {

        throw redirect(302, '/login');
    }
}