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

<header class="py-5 px-8 border-b border-gray-100 flex justify-between">
	<div class="">
		<h1 class="text-3xl mb-1 capitalize">Schedule</h1>
        <p class="text-xs text-gray-400">Well here is kanda short description</p>
	</div>

	<nav>
		<button
			class="bg-black px-6 py-2 rounded-md font-bold text-white"
			on:click={() => (show = true)}
		>
			Create
		</button>
	</nav>
</header>

<div id="ec" class="bg-white px-8 py-4" />

<Modal bind:showModal={show}>
	<form use:enhance method="post" class="w-[400px]">
		<h2 class="text-2xl font-semibold mb-4">Add Schedule</h2>

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
