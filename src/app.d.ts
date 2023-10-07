// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: {
				id: number,
				firstname: string?;
				lastname: string?;
				email: string;
				role: string
				age: number?;
				gender: string?;
				createdAt: Date;
			},
			campsite: {
				id: string;
				name: string;
				location: string;
				capacity: number;
			}
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export { };
