<script lang="ts">
	import { enhance } from '$app/forms';
	import Modal from '$lib/components/modal.svelte';
	import { onMount } from 'svelte';
	import type { ActionData, PageData } from './$types';
	export let data: PageData;
	export let response: ActionData;

	let patients = data.patients;
	let query: string | null;

	function search(e: any) {
		const value: string | null = e.target.value;

		if (value) {
			const filteredPatients = patients.filter((patient) => {
				return (
					patient.firstname?.toLowerCase().includes(value.toLowerCase()) ||
					patient.lastname?.toLowerCase().includes(value.toLowerCase()) ||
					patient.age?.toString().includes(value) ||
					patient.gender?.toLowerCase().includes(value.toLowerCase()) ||
					patient.email.toLowerCase().includes(value.toLowerCase())
				);
			});

			console.log(filteredPatients);

			patients = [...filteredPatients];
		} else if (value == '') {
			patients = data.patients;
		}
	}

	let showAddPatientModal: boolean = false;
</script>

<Modal bind:showModal={showAddPatientModal} action="?/add" title="Add New Patient">
	<!-- Fill in all records are required -->
	{#if response?.error}
		<p class="text-rose-500">{response.message}</p>
	{/if}

	<div class="w-[700px]">
		<div class="flex space-x-8">
			<div class="mb-4 w-full">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="firstname">
					First Name
				</label>
				<input
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="firstname"
					type="text"
					placeholder="Enter first name"
					name="firstname"
				/>
			</div>
			<div class="mb-4 w-full">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="lastname"> Last Name </label>
				<input
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="lastname"
					type="text"
					placeholder="Enter last name"
					name="lastname"
				/>
			</div>
		</div>

		<div class="flex space-x-8">
			<div class="mb-4 w-full">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="email"> Email </label>
				<input
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="email"
					type="email"
					placeholder="Enter email address"
					name="email"
				/>
			</div>
			<div class="mb-4 w-full">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="password"> Password </label>
				<input
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="password"
					type="password"
					placeholder="Enter password"
					name="password"
				/>
			</div>
		</div>

		<div class="flex space-x-8">
			<div class="mb-6">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="nurseGender"> Age </label>
				<input
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="age"
					type="number"
					placeholder="Enter age"
					name="age"
				/>
			</div>
			<div class="mb-6">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="nurseGender"> Gender </label>
				<select
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="nurseGender"
					name="gender"
				>
					<option value="male">Male</option>
					<option value="female">Female</option>
				</select>
			</div>
		</div>
	</div>
</Modal>

<header class="py-5 px-8 border-b border-gray-100 flex justify-between">
	<div class="">
		<h1 class="text-3xl mb-1">Patients</h1>
		<p class="text-xs text-gray-400">Provide a description</p>
	</div>

	<nav>
		<button
			class="bg-black px-6 py-2 rounded-md font-bold text-white"
			on:click={() => (showAddPatientModal = true)}
		>
			New
		</button>
	</nav>
</header>

<section class="bg-white">
	<div class="relative overflow-x-auto p-8">
		<div class="flex items-center justify-between py-4 bg-white dark:bg-gray-800">
			<label for="table-search" class="sr-only">Search</label>
			<div class="relative">
				<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<svg
						class="w-4 h-4 text-gray-500 dark:text-gray-400"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 20 20"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
						/>
					</svg>
				</div>
				<input
					type="text"
					id="table-search-users"
					class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Search for patients by first or last name"
					bind:value={query}
					on:change={search}
					on:input={search}
				/>
			</div>
		</div>
		<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
			<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
				<tr>
					<th scope="col" class="px-6 py-3"> Patient </th>
					<th scope="col" class="px-6 py-3"> Gender </th>
					<th scope="col" class="px-6 py-3"> Age </th>
					<th scope="col" class="px-6 py-3"> Action </th>
				</tr>
			</thead>
			<tbody>
				{#each patients as patient}
					<tr
						class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
					>
						<th scope="row" class="">
							<div
								class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
							>
								<div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
									<span class="material-symbols-outlined"> personal_injury </span>
								</div>
								<div class="pl-3">
									<div class="text-base font-semibold">{patient.firstname} {patient.lastname}</div>
									<div class="font-normal text-gray-500">{patient.email}</div>
								</div>
							</div>
						</th>
						<td class="px-6 py-4 space-y-1 capitalize"> {patient.gender} </td>
						<td class="px-6 py-4"> {patient.age} </td>
						<td class="px-6 py-4">
							<form action={`/admin/patients/${patient.id}?`} method="post">
								<button
									type="submit"
									class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
								>
									Remove
								</button>
							</form>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>

<style>
	.material-symbols-outlined {
		font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
	}
</style>
