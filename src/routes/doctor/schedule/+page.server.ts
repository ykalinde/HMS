import { prisma } from '$lib/database';
import type { PageServerLoad } from './$types';

export const load = (async ({cookies}) => {
    const id = cookies.get('session');

    return {
        schedule: await prisma.schedule.findMany({
            where: {id: Number.parseInt(id!)}
        })
    };
}) satisfies PageServerLoad;