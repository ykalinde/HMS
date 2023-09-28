// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: {
				id: string;
				email: string;
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

export {};
