import { prisma } from '$lib/database';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {
        patients: await prisma.user.findMany({
            where: {role: 'patient'},
            include: {visits: true, schedules: true}
        }),
    };
}) satisfies PageServerLoad;