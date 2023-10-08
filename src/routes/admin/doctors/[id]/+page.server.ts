import { prisma } from '$lib/database';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions = {
    default: async({params}) => {

        const id = Number.parseInt(params.id);

        await prisma.user.delete({where: {id: id}});

        throw redirect(302, '/admin/doctors');
    }
}