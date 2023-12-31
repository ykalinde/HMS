import { prisma } from '$lib/database';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {
        nurses: await prisma.user.findMany({ where: { role: "nurse" } }),
        doctors: await prisma.user.findMany({ where: { role: "doctor" } }),
        patients: await prisma.user.findMany({ where: { role: "patient" } })
    };
}) satisfies PageServerLoad;