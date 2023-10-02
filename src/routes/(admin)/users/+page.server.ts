import { prisma } from '$lib/database';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {
        users: await prisma.user.findMany()
    };
}) satisfies PageServerLoad;