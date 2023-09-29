<script lang="ts">
	import { enhance } from '$app/forms';
	import Modal from '$lib/components/modal.svelte';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let response: ActionData;

	let show: boolean = false;
</script>

<header class="py-5 border-b border-gray-100 mb-10 flex justify-between">
	<div class="">
		<h1 class="text-3xl mb-1">Nurses</h1>
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

{#if data.nurses.length >= 1}
	<div class="">
		<table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
			<thead class="bg-gray-800 text-white">
				<tr>
					<th class="py-2 px-4 text-left">#</th>
					<th class="py-2 px-4 text-left">Name</th>
					<th class="py-2 px-4 text-left">Age</th>
					<th class="py-2 px-4 text-left">Gender</th>
					<th class="py-2 px-4 text-left">Action</th>
				</tr>
			</thead>
			<tbody>
				{#each data.nurses as nurse, index}
					<tr class="hover:bg-gray-200">
						<td class="py-2 px-4">{index}</td>
						<td class="py-2 px-4 capitalize">{nurse.name}</td>
						<td class="py-2 px-4 capitalize">{nurse.age}</td>
						<td class="py-2 px-4 capitalize">{nurse.gender}</td>
						<td class="py-2 px-4">
							<form action="/nurses?/delete" method="post" use:enhance>
								<input type="text" name="id" value={nurse.id} hidden />
								<button type="submit">Delete</button>
							</form>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	{:else}
	<h2>Sorry no nurses available</h2>
{/if}

<Modal bind:showModal={show}>
	<!-- Fill in all records are required -->
	{#if response?.invalid}
		<p class="text-rose-500">Error</p>
	{/if}

	<form action="/nurses?/add" use:enhance method="post" class="w-96">
		<h2 class="text-2xl font-semibold mb-4">Add Nurse</h2>

		<div class="mb-4">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="nurseName"> Nurse Name </label>
			<input
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				id="nurseName"
				type="text"
				placeholder="Enter Nurse Name"
				name="name"
			/>
		</div>
		<div class="mb-4">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="nurseAge"> Nurse Age </label>
			<input
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				id="nurseAge"
				type="number"
				placeholder="Enter Nurse Age"
				name="age"
			/>
		</div>
		<div class="mb-6">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="nurseGender">
				Nurse Gender
			</label>
			<select
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				id="nurseGender"
				name="gender"
			>
				<option value="male">Male</option>
				<option value="female">Female</option>
			</select>
		</div>
		<div class="flex items-center justify-between">
			<button
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				type="submit"
				on:click={() => (show = false)}
			>
				Add Nurse
			</button>
		</div>
	</form>
</Modal>
