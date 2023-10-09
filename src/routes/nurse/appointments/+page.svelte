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

<header class="py-5 border-b border-gray-100 mb-10 p-8">
	<h1 class="text-3xl mb-1">Appointments</h1>
	<p class="text-xs text-gray-400">Upcoming patient appointments</p>
</header>

<section class="bg-white p-8">
	{#if data.visits.length}
		<div class="relative overflow-x-auto">
			<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead
					class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
				>
					<tr>
						<th scope="col" class="px-6 py-3"> Patient </th>
						<th scope="col" class="px-6 py-3"> Condition </th>
						<th scope="col" class="px-6 py-3"> Doctor Assigned</th>
						<th scope="col" class="px-6 py-3" />
						<th scope="col" class="px-6 py-3"> Date</th>
					</tr>
				</thead>
				<tbody>
					{#each data.visits as visit}
						<tr
							class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
						>
							<th
								scope="row"
								class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
							>
								{visit.user.firstname} {visit.user.lastname}
							</th>
							<th
									scope="row"
									class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
							>
								{visit.condition}
							</th>
							<td class="px-6 py-4">Dr. {visit.doctor.firstname} {visit.doctor.lastname}</td>
							<td class="px-6 py-4">
								<Expandable title="Vitals">
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
							</td>
							<td class="px-6 py-4"> {formatDateToCustomString(visit.visitedAt)}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else}
		<p>No records</p>
	{/if}
</section>

<Modal bind:showModal={show} title="Visit">
	<!-- Fill in all records are required -->
	<!-- {#if response?.error}
		<p class="text-rose-500">{response.message}</p>
	{/if}
 -->
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
											name="conditions"
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
<!--		<button-->
<!--			class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"-->
<!--			type="submit"-->
<!--		>-->
<!--			Submit-->
<!--		</button>-->
	</form>
</Modal>
