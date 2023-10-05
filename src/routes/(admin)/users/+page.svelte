<script lang="ts">
	import { enhance } from '$app/forms';
	import Modal from '$lib/components/modal.svelte';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let response: ActionData;

	let show: boolean = false;

    function hide() {
        show = false;
    }
</script>

<header class="py-5 border-b border-gray-100 mb-10 flex justify-between">
	<div class="">
		<h1 class="text-3xl mb-1">Users</h1>
		<p class="text-xs text-gray-400">Provide a description</p>
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

{#if data.users.length >= 1}
	<div class="overflow-x-auto shadow-md sm:rounded-md">
		<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
			<thead
				class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400"
			>
				<tr>
					<th scope="col" class="px-6 py-3"> Full name </th>
					<th scope="col" class="px-6 py-3"> Role </th>
					<th scope="col" class="px-6 py-3"> Email </th>
					<th scope="col" class="px-6 py-3"> Gender </th>
					<th scope="col" class="px-6 py-3">
						<span class="sr-only">Edit</span>
					</th>
				</tr>
			</thead>
			<tbody>
				{#each data.users as user, index}
					<tr
						class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
					>
						<th
							scope="row"
							class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize"
						>
							{#if user.role == "nurse" || user.role == 'doctor'}
                                <a href="/users/nurses/{user.id}" class="hover:text-blue-600">{user.firstname} {user.lastname}</a>
                                {:else}
                                {user.firstname} {user.lastname}
                            {/if}
						</th>
						<td class="px-6 py-4 capitalize"> {user.role} </td>
						<td class="px-6 py-4"> {user.email} </td>
						<td class="px-6 py-4 capitalize"> {user.gender} </td>
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

<Modal bind:showModal={show}>
    
	<!-- Fill in all records are required -->
	{#if response?.error}
		<p class="text-rose-500">{response.message}</p>
	{/if}

	<form action="/users?" use:enhance method="post" class="w-[700px]">
		<h2 class="text-2xl font-semibold mb-4">Add new user</h2>

		<div class="flex space-x-8">
            <div class="mb-4 w-full">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="firstname"> First Name </label>
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
                <label class="block text-gray-700 text-sm font-bold mb-2" for="nurseGender">
                    Age
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="age"
                    type="number"
                    placeholder="Enter age"
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
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="nurseGender">
                    Role
                </label>
                <select
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="nurseGender"
                    name="role"
                >
                    <option value="doctor">Doctor</option>
                    <option value="nurse">Nurse</option>
                    <option value="patient">Patient</option>
                </select>
            </div>
        </div>
		<div class="flex items-center justify-between">
			<button
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				type="submit"
				
			>
				Add User
			</button>
		</div>
	</form>
</Modal>
