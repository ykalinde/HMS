import { redirect } from '@sveltejs/kit'

export const actions = {
    default: async ({ cookies }) => {

        cookies.delete('session');

        throw redirect(302, '/login');
    }
}