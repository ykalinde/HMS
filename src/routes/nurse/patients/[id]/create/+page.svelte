<script lang="ts">
	import { enhance } from '$app/forms';
	import Expandable from '$lib/components/expandable.svelte';
	import Modal from '$lib/components/modal.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let show: boolean = false;

	let sel: any = [];

	const visits = data.visits;

	function formatDateToCustomString(date: any) {
		const options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			hour12: true
		};

		return date.toLocaleDateString('en-US', options);
	}
</script>

<header class="px-8 py-5 border-b border-gray-100 flex justify-between">
	<div class="">
		{#if data.patient}
			<h1 class="text-3xl mb-1 capitalize">Passport</h1>

			<nav class="flex">
				<ol class="inline-flex items-center space-x-1 md:space-x-3">
					<li class="inline-flex items-center">
						<a
							href="/nurse"
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
								href="/nurse/patients"
								class="ml-1 text-xs font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
								>Patients</a
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
								>{data.patient.firstname}</span
							>
						</div>
					</li>
				</ol>
			</nav>
		{/if}
	</div>
</header>

<section class="bg-white p-8">
	<a href={`/nurse/patients/${data.userId}`} class="bg-black px-6 py-2 rounded-md font-bold text-white mb-8 block w-20">Back</a>
	<form method="POST" use:enhance class="w-[900px]">
		<h2 class="text-2xl font-semibold mb-4">Vitals</h2>

		<input type="hidden" name="conditions" bind:value={sel} />
		<input type="hidden" name="userId" bind:value={data.userId} />

		<div class="w-full flex space-x-10">
			<div class="w-[500px]">
				<div class="mb-4 w-full">
					<label class="block text-gray-700 text-sm font-bold mb-2" for="bp">
						Blood pressure
					</label>
					<input
							class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="bp"
							type="number"
							placeholder="0"
							name="bp"
					/>
				</div>

				<div class="flex space-x-8">
					<div class="mb-4 w-full">
						<label class="block text-gray-700 text-sm font-bold mb-2" for="height"> Height </label>
						<input
								class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="height"
								type="number"
								placeholder="0"
								name="height"
						/>
					</div>
					<div class="mb-4 w-full">
						<label class="block text-gray-700 text-sm font-bold mb-2" for="weight"> Weight </label>
						<input
								class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="weight"
								type="number"
								placeholder="0"
								name="weight"
						/>
					</div>
				</div>

				<div class="mb-4 w-full">
					<label class="block text-gray-700 text-sm font-bold mb-2" for="temperature">
						Temperature
					</label>
					<input
							class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="temperature"
							type="number"
							placeholder="0"
							name="temperature"
					/>
				</div>
				<div class="mb-4 w-full">
					<label class="block text-gray-700 text-sm font-bold mb-2" for="temperature">
						Asign a doctor
					</label>

					<select
							name="doctorId"
							id="doctorId"
							class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					>
						<option selected disabled>Select a doctor</option>
						{#each data.doctors as doctor}
							<option value={doctor.id}>{doctor.firstname} {doctor.lastname}</option>
						{/each}
					</select>
				</div>
			</div>
			<div class="w-full border-l border-gray-200 pl-5">
				<div class="grid grid-cols-2 gap-2">
					{#each data.categories as category}
						<div class="">
							<Expandable title={category.title}>
								{#each category.conditions as condition}
									<div class="px-4">
										<input
												type="checkbox"
												name=""
												id={condition.id.toString()}
												bind:group={sel}
												value={condition.id}
										/>
										<label for={condition.id.toString()}>{condition.name}</label>
									</div>
								{/each}
							</Expandable>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- <div class="flex space-x-8">
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
		</div> -->
				<button
					class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					type="submit"
				>
					Submit
				</button>
	</form>
</section>

