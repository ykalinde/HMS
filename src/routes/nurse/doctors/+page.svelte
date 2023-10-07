<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<header class="py-5 border-b border-gray-100 mb-10">
	<h1 class="text-3xl mb-1">Doctors</h1>
	<p class="text-xs text-gray-400">Well here is kanda short description</p>

	<nav />
</header>


{#if data.doctors.length >= 1}
	<div class="overflow-x-auto shadow-md sm:rounded-md">
		<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
			<thead
				class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400"
			>
				<tr>
					<th scope="col" class="px-6 py-3"> Full name </th>
					<th scope="col" class="px-6 py-3"> Email </th>
					<th scope="col" class="px-6 py-3"> Gender </th>
					<th scope="col" class="px-6 py-3">
						<span class="sr-only">Edit</span>
					</th>
				</tr>
			</thead>
			<tbody>
				{#each data.doctors as doctor, index}
					<tr
						class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
					>
						<th
							scope="row"
							class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize"
						>
                        <a href="/users/nurses/{doctor.id}" class="hover:text-blue-600">{doctor.firstname} {doctor.lastname}</a>
						
						</th>
						<td class="px-6 py-4"> {doctor.email} </td>
						<td class="px-6 py-4 capitalize"> {doctor.gender} </td>
						<td class="px-6 py-4 text-right">
							<a href="#/" class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
								>Edit</a
							>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{:else}
	<h2>Sorry no nurses available</h2>
{/if}