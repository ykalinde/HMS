import { prisma } from '$lib/database';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {
        doctors: await prisma.user.findMany({where: {role: 'doctor'}}),
    };
}) satisfies PageServerLoad;