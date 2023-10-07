<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

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
</script>

<header class="py-5 border-b border-gray-100 px-8">
	<h1 class="text-3xl mb-1">Patients</h1>
	<p class="text-xs text-gray-400">Well here is kanda short description</p>

	<nav />
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
					<th scope="col" class="px-6 py-3"> Visits </th>
					<th scope="col" class="px-6 py-3"> Action </th>
				</tr>
			</thead>
			<tbody>
				{#each patients as patient}
					<tr
						class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
					>
						<th scope="row" class="">
							<a
								href={`/nurse/patients/${patient.id}`}
								class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
							>
								<div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
									<span class="material-symbols-outlined"> personal_injury </span>
								</div>
								<div class="pl-3">
									<div class="text-base font-semibold">{patient.firstname} {patient.lastname}</div>
									<div class="font-normal text-gray-500">{patient.email}</div>
								</div>
							</a>
						</th>
						<td class="px-6 py-4 space-y-1 capitalize"> {patient.gender} </td>
						<td class="px-6 py-4"> {patient.age} </td>
						<td class="px-6 py-4"> {patient.visits.length} </td>
						<td class="px-6 py-4">
							<!-- Modal toggle -->
							<a
								href="/doctor/patients/12"
								type="button"
								data-modal-target="editUserModal"
								data-modal-show="editUserModal"
								class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Remove</a
							>
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
