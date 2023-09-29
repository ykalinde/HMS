import { prisma } from '$lib/database';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {
        nurses: await prisma.nurse.findMany(),
    };
}) satisfies PageServerLoad;