<script lang="ts">
	import { enhance } from '$app/forms';
	import Expandable from '$lib/components/expandable.svelte';
	import Modal from '$lib/components/modal.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let show: boolean = false;

	let sel: any = [];
</script>

<header class="py-5 border-b border-gray-100 mb-10 flex justify-between">
	<div class="">
		{#if data.patient}
			<h1 class="text-3xl mb-1 capitalize">Passport</h1>

			<nav class="flex">
				<ol class="inline-flex items-center space-x-1 md:space-x-3">
					<li class="inline-flex items-center">
						<a
							href="/patients"
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
								href="/patients"
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
								>Records</span
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
			Create
		</button>
	</nav>
</header>

<section class="flex">
	<section class="px-8 py-4 w-1/2 bg-white shadow rounded-md">
		<div class="pb-3 mb-3 border-b">
			<h1 class="text-xl font-bold">{data.patient?.firstname} {data.patient?.lastname}</h1>
		</div>
		<div class=""><span class="text-gray-500">Email:</span> {data.patient?.email}</div>
		<div class=""><span class="text-gray-500">Age:</span> {data.patient?.age}</div>
		<div class="capitalize"><span class="text-gray-500">Gender:</span> {data.patient?.gender}</div>
	</section>

	<section class="space-y-3 px-8 w-full">
		<div class="p-5 bg-gray-200 w-full rounded-md">Vitals</div>
		<div class="">
			{#each data.visits as visit}
			<Expandable title={`${visit.visitedAt.getDay()}/${visit.visitedAt.getMonth()}/${visit.visitedAt.getFullYear()}`}>
				<ul class="px-3">
					{#each visit.vitals as vital}
						<li class="p-4 bg-white shadow">
							<div class="">Blood Pressure: {vital.bloodPressure}</div>
							<div class="">Temperature: {vital.temperature}</div>
							<div class="">Weight: {vital.weight}</div>
							<div class="">Height: {vital.height}</div>
						</li>
					{/each}
				</ul>
			</Expandable>
			{/each}
		</div>
	</section>
</section>

<Modal bind:showModal={show}>
	<!-- Fill in all records are required -->
	<!-- {#if response?.error}
		<p class="text-rose-500">{response.message}</p>
	{/if}
 -->
	<form action="" use:enhance method="post" class="w-[900px]">
		<h2 class="text-2xl font-semibold mb-4">Vitals</h2>

		<input type="hidden" name="symptoms" bind:value={sel} />
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
						Condition
					</label>

					<select
						name="condition"
						id="condition"
						class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					>
						<option selected disabled>Select condition</option>
						<option value="critical">critical</option>
					</select>
				</div>
			</div>
			<div class="w-full border-l border-gray-200 pl-5">
				<div class="grid grid-cols-2 gap-2">
					{#each data.categories as category}
						<div class="">
							<Expandable title={category.title}>
								{#each category.symptoms as symptom}
									<div class="px-4">
										<input
											type="checkbox"
											name=""
											id={symptom.id.toString()}
											bind:group={sel}
											value={symptom.id}
										/>
										<label for={symptom.id.toString()}>{symptom.name}</label>
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
</Modal>
