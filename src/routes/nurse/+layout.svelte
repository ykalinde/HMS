<script lang="ts">
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';
	import Expandable from '$lib/components/expandable.svelte';

	export let data: LayoutData;

	const pages = [
		{
			name: 'Dashboard',
			url: '/nurse',
			icon: 'bar_chart'
		},
		{
			name: 'Doctors',
			url: '/nurse/doctors',
			icon: 'analytics'
		},
		{
			name: 'Patients',
			url: '/nurse/patients',
			icon: 'personal_injury'
		},
		{
			name: 'Appointments',
			url: '/nurse/appointments',
			icon: 'personal_injury'
		},
		{
			name: 'Schedule',
			url: '/doctor/schedule',
			icon: 'calendar_month'
		},
	];
</script>

<aside
	class="w-72 h-screen border-r border-gray-100 p-8 space-y-5 fixed top-0 left-0 bg-white flex flex-col"
>
	<div class="flex items-center space-y-2 space-x-4 border-b border-gray-200 pb-10">
		<div class="bg-gray-400 w-12 h-12 rounded-full flex items-center justify-center">
			<span class="material-symbols-outlined"> person </span>
		</div>

		<div class="">
			<div class="">
				<span>{data.user.firstname}</span>
			</div>
			<span class="text-gray-500 text-sm">{data.user.email}</span>
		</div>
	</div>
	<nav class="h-[100%] flex flex-col justify-between">
		<ul class="space-y-2 font-medium">
			{#each pages as link}
				<li>
					<a
						href={link.url}
						class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
						class:bg-gray-100={$page.url.pathname == link.url}
					>
						<span class="material-symbols-outlined text-gray-500 dark:text-gray-400">
							{link.icon}
						</span>
						<span class="ml-3">{link.name}</span>
					</a>
				</li>
			{/each}
		</ul>

		<div class="">
			<form action="/logout" method="post">
				<button
					class="flex items-center space-x-2 hover:bg-black hover:text-white py-1.5 px-2 rounded-md"
				>
					<span class="material-symbols-outlined"> logout </span>
					<span>Logout</span>
				</button>
			</form>
		</div>
	</nav>
</aside>

<main class="pl-72">
	<div class="w-full">
		<slot />
	</div>
</main>

<style>
	.material-symbols-outlined {
		font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
	}
</style>
