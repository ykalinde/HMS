import { prisma } from '$lib/database';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { number, object, string, ValidationError, date, bool } from "joi";

export const load = (async ({ params }) => {

    return {
        nurse: await prisma.user.findFirst({ where: { id: Number.parseInt(params.id) } }),
        schedule: await prisma.schedule.findMany({
            where: {
                user_id: Number.parseInt(params.id),
            }
        })
    };
}) satisfies PageServerLoad;

function colorGen() {
    // Generate random values for the red, green, and blue channels
    const red = Math.floor(Math.random() * 156) + 100; // Ranges from 100 to 255
    const green = Math.floor(Math.random() * 156) + 100; // Ranges from 100 to 255
    const blue = Math.floor(Math.random() * 156) + 100; // Ranges from 100 to 255

    // Convert the RGB values to a CSS color string
    const color = `rgb(${red}, ${green}, ${blue})`;

    return color;
}

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();

        const schema = object({
            user_id: number().required(),
            title: string(),
            start: date().required(),
            end: date().required(),
            all_day: bool()
        })

        try {
            const body = await schema.validateAsync({
                user_id: data.get('user_id'),
                title: data.get('title'),
                start: data.get('start'),
                end: data.get('end'),
                all_day: data.get('all_day') == 'on' ? true : false
            });

            const background = colorGen();

            const schedule = await prisma.schedule.create({
                data: {...body, background: background }
            })
        } catch (error: any) {
            console.log(error)
            if(error instanceof ValidationError) {
                return fail(400, { error: true, message:  error.message});
            }

            return fail(400, { error: true, message:  error.message});
        }

        throw redirect(302, `/users/nurses`);
    }
}