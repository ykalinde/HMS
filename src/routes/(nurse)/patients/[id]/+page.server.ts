import { prisma } from '$lib/database';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
    return {
        patient: prisma.user.findFirst({
            where: { id: Number.parseInt(params.id) }
        }),
        categories: prisma.category.findMany({
            include: { symptoms: true }
        })
    };
}) satisfies PageServerLoad;

export const actions = {
    default: async({request}) => {

        const data = await request.formData();

        const symptoms_ids = data.get('symptoms');
        const height = data.get('height');
        const weight = data.get('weight');
        const temperature = data.get('temperature');
        const bp = data.get('bp');

        console.log(symptoms_ids);

    }
}