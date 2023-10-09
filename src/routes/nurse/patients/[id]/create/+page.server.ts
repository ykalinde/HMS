import {prisma} from '$lib/database';
import {redirect} from '@sveltejs/kit';
import type {PageServerLoad} from '../$types';
import {number, object, string} from "joi";

export const load = (async ({params}) => {
    return {
        userId: params.id,
        patient: prisma.user.findFirst({
            where: {id: Number.parseInt(params.id)},
            include: {visits: {include: {visits: true}}},
        }),
        categories: prisma.category.findMany({
            include: {conditions: true}
        }),
        visits: prisma.visit.findMany({
            where: {user_id: Number.parseInt(params.id)},
            include: {vitals: true, visits: true}
        }),
        doctors: prisma.user.findMany({where: {role: 'doctor'}}),
        specialities: prisma.speciality.findMany({}),
    };
}) satisfies PageServerLoad;

interface Condition {
    id: number;
    severity: string;
    name: string;
    category_id: number;
}

const severityLevels = ['Critical', 'Severe', 'Mild', 'Stable'];

// Calculate the overall severity based on selected condition IDs
async function calculateOverallSeverity(selectedConditionIds: number[]): Promise<string> {
    console.log("Selected conditions", selectedConditionIds);

    if (selectedConditionIds.length === 0) {
        return 'Stable'; // Default to 'Stable' if no conditions are selected
    }

    // Fetch condition objects for the selected IDs
    const selectedConditions = await prisma.condition.findMany({
        where: {
            id: {
                in: selectedConditionIds,
            },
        },
    });

    // Calculate the average severity index
    const averageSeverityIndex = Math.floor(
        selectedConditions.reduce((sum, condition) => {
            const conditionSeverityIndex = severityLevels.indexOf(condition.severity);
            return sum + conditionSeverityIndex;
        }, 0) / selectedConditions.length
    );

    // Ensure the calculated index is within bounds
    const overallSeverityIndex = Math.max(0, Math.min(averageSeverityIndex, severityLevels.length - 1));

    // Retrieve the overall severity based on the calculated index
    const overallSeverity = severityLevels[overallSeverityIndex];

    return overallSeverity;
}


//Critical, Severe, Miled, Stable
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
    default: async ({request, cookies, params}) => {

        const doctorId = Number.parseInt(params.id);

        const data = await request.formData();

        const conditions: any = data.get('conditions');
        // const userId = data.get('userId');

        console.log("Conditions",conditions)

        const numbersArray = conditions == null ? [] : conditions.split(',').map(Number);

        const overallSeverity = await calculateOverallSeverity(numbersArray);

        const schema = object({
            userId: number().required(),
            doctorId: number().required(),
            height: number().required(),
            weight: number().required(),
            temperature: number().required(),
            bloodPressure: number().required(),
            condition: string().required()
        });

        // you added some ui which is not aligning with your functionality
        // do am changing

        try {

            const validate = {
                userId: data.get('userId'),
                doctorId: parseInt(data.get('doctorId')),
                height: parseInt(data.get('height')),
                weight: parseInt(data.get('weight')),
                condition: overallSeverity,
                temperature: parseInt(data.get('temperature')),
                bloodPressure: parseInt(data.get('bp'))
            };

            const body = await schema.validateAsync(validate);

            const visit = await prisma.visit.create({
                data: {
                    user_id: body.userId,
                    condition: body.condition,
                    doctorId: doctorId
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

            await insertSymptomsOnVisits(conditions, visit.id);

        } catch (error) {
            console.log(error);
        }

        throw redirect(302, `/nurse/patients/${params.id}/create`)

    }
}