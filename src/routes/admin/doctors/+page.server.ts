import { prisma } from '$lib/database';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import * as bcrypt from "bcrypt";
import { number, object, string, ValidationError } from "joi";

export const load = (async () => {
    return {
        doctors: await prisma.user.findMany({ where: { role: 'doctor' } }),
    };
}) satisfies PageServerLoad;

export const actions = {
    add: async ({ request }) => {
        const data = await request.formData();

        const schema = object({
            firstname: string().required(),
            lastname: string().required(),
            email: string().email().required(),
            password: string().required(),
            role: string().required(),
            age: number().required(),
            gender: string().required(),
        });

        try {
            const body = await schema.validateAsync({
                firstname: data.get('firstname'),
                lastname: data.get('lastname'),
                email: data.get('email'),
                password: data.get('password'),
                role: "doctor",
                age: data.get('age'),
                gender: data.get('gender')
            });

            const result = await prisma.user.findUnique({
                where: { email: body.email }
            })

            if (result) {
                throw new Error('User already exists');
            }

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(body.password, salt);

            const user = await prisma.user.create({
                data: { ...body, password: hash }
            });

        } catch (error: any) {
            if (error instanceof ValidationError) {
                return fail(400, { error: true, message: error.message });
            }

            return fail(400, { error: true, message: error.message });
        }

        throw redirect(302, '/admin/doctors/');
    }
}