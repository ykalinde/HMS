<script lang="ts">
	import type { PageData } from './$types';
	import Calendar from '@event-calendar/core';
	import DayGrid from '@event-calendar/day-grid';
	import { onMount } from 'svelte';
	import Modal from '$lib/components/modal.svelte';
	import { enhance } from '$app/forms';

	export let data: PageData;

	let show: boolean = false;

	let plugins = [DayGrid];
	let options: any = {
		view: 'dayGridMonth',
		events: data.schedule.map((data) => {
			return {
				id: data.id,
				allDay: data.all_day,
				title: data.title,
				backgroundColor: data.background,
				start: data.start,
				end: data.end
			};
		})
	};

	onMount(() => {
		let ec = new Calendar({
			target: document.getElementById('ec'),
			props: {
				plugins: plugins,
				options: options
			}
		});
	});
</script>

<header class="py-5 border-b border-gray-100 mb-10 flex justify-between">
	<div class="">
		{#if data.nurse}
			<h1 class="text-3xl mb-1 capitalize">{data.nurse.firstname}</h1>

			<nav class="flex">
				<ol class="inline-flex items-center space-x-1 md:space-x-3">
					<li class="inline-flex items-center">
						<a
							href="/"
							class="inline-flex items-center text-xs font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
						>
							<svg
								class="w-2.5 h-2.5 mr-2.5"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"
								/>
							</svg>
							Home
						</a>
					</li>
					<li>
						<div class="flex items-center">
							<svg
								class="w-2.5 h-2.5 text-gray-400 mx-0"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 6 10"
							>
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="m1 9 4-4-4-4"
								/>
							</svg>
							<a
								href="/users"
								class="ml-1 text-xs font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
								>Users</a
							>
						</div>
					</li>
					<li aria-current="page">
						<div class="flex items-center">
							<svg
								class="w-2.5 h-2.5 text-gray-400 mx-1"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 6 10"
							>
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="m1 9 4-4-4-4"
								/>
							</svg>
							<span class="ml-1 text-xs font-medium text-gray-500 md:ml-2 dark:text-gray-400"
								>{data.nurse.firstname}</span
							>
						</div>
					</li>
				</ol>
			</nav>
		{/if}
	</div>

	<nav>
		<button
			class="bg-black px-6 py-2 rounded-md font-bold text-white"
			on:click={() => (show = true)}
		>
			Add
		</button>
	</nav>
</header>

<div id="ec" class="bg-white px-4 py-4 rounded-md shadow" />

<Modal bind:showModal={show}>
	<form use:enhance method="post" class="w-[400px]">
		<h2 class="text-2xl font-semibold mb-4">Add Schedule</h2>

		<input type="text" name="user_id" id="user_id" hidden value={data.nurse?.id} />

		<div class="flex space-x-8">
			<div class="mb-4 w-full">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="title"> Title </label>
				<input
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="title"
					type="text"
					placeholder="Enter schedule title"
					name="title"
					required
				/>
			</div>
		</div>

		<div class="flex space-x-8">
			<div class="mb-4 w-full">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="start"> Start Date </label>
				<input
					class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="start"
					type="datetime-local"
					name="start"
					required
				/>
			</div>
			<div class="mb-4 w-full">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="end"> End Date </label>
				<input
					class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="end"
					type="datetime-local"
					name="end"
					required
				/>
			</div>
		</div>

		<div class="flex space-x-8">
			<div class="flex items-center space-x-3">
				<label class="block text-gray-700 text-sm font-bold" for="all_day">
					Available all day:
				</label>
				<input type="checkbox" name="all_day" id="all_day" />
			</div>
		</div>
		<div class="flex items-center justify-between mt-8">
			<button
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				type="submit"
			>
				Save
			</button>
		</div>
	</form>
</Modal>
