import { prisma } from '$lib/database';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { number, object, string, ValidationError } from "joi";

export const load = (async ({ params }) => {
    return {
        userId: params.id,
        patient: prisma.user.findFirst({
            where: { id: Number.parseInt(params.id) }
        }),
        categories: prisma.category.findMany({
            include: { symptoms: true }
        }),
        visits: prisma.visit.findMany({
            include: {vitals: true, visits: true}
        })
    };
}) satisfies PageServerLoad;


async function insertSymptomsOnVisits(ids: string, visitId: number) {
    const numbersArray = ids.split(',').map(Number);

    for (const id of numbersArray) {
        await prisma.symptomsOnVisits.create({
            data: {
                symptom_id: id,
                visit_id: visitId
            },
        });
    }
}

export const actions = {
    default: async ({ request }) => {

        const data = await request.formData();

        const symptoms_ids: any = data.get('symptoms');
        const userId = data.get('userId');

        console.log(symptoms_ids?.length);

        const schema = object({
            userId: number().required(),
            height: number().required(),
            weight: number().required(),
            temperature: number().required(),
            bloodPressure: number().required(),
            condition: string().required()
        });

        // you added some ui which is not aligning with your functionality
        // do am changing

        try {

            const body = await schema.validateAsync({
                userId: data.get('userId'),
                height: data.get('height'),
                weight: data.get('weight'),
                condition: data.get('condition'),
                temperature: data.get('temperature'),
                bloodPressure: data.get('bp')
            })

            const visit = await prisma.visit.create({
                data: {
                    user_id: body.userId,
                    condition: body.condition,
                }
            });

            const vitals = await prisma.vital.create({
                data: {
                    weight: body.weight,
                    height: body.height,
                    temperature: body.temperature,
                    bloodPressure: body.bloodPressure,
                    visitId: visit.id
                }
            });

            await insertSymptomsOnVisits(symptoms_ids, visit.id);

        } catch (error) {

        }

        throw redirect(302, `/patients/${userId}`)

    }
}