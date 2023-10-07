<!-- <script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
</script> -->

<!-- src/HealthPassport.svelte -->
<script>
	let patientName = 'John Doe';
	let dob = 'January 1, 1980';
	let bloodType = 'O+';
	let allergies = 'None';

	let healthRecords = [
		{
			date: '2023-01-15',
			condition: 'Fever',
			description: 'Mild fever, took over-the-counter medicine.'
		},
		{
			date: '2022-09-10',
			condition: 'Annual check-up',
			description: 'Routine check-up, everything is normal.'
		}
		// Add more health records as needed
	];
</script>

<div class="bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 rounded-lg p-4 shadow-md">
	<h1 class="text-3xl font-semibold mb-2 text-white">Health Passport</h1>
	<div class="mb-4">
		<label class="block text-gray-800">Patient Name:</label>
		<p class="text-lg text-gray-900">{patientName}</p>
	</div>
	<div class="mb-4">
		<label class="block text-gray-800">Date of Birth:</label>
		<p class="text-lg text-gray-900">{dob}</p>
	</div>
	<div class="mb-4">
		<label class="block text-gray-800">Blood Type:</label>
		<p class="text-lg text-gray-900">{bloodType}</p>
	</div>
	<div class="mb-4">
		<label class="block text-gray-800">Allergies:</label>
		<p class="text-lg text-gray-900">{allergies}</p>
	</div>
	<h2 class="text-2xl font-semibold mb-2 mt-4 text-white">Health Records</h2>
	<ul>
		{#each healthRecords as record (record.date)}
			<li class="mb-4">
				<div class="text-lg text-gray-800">Date: {record.date}</div>
				<div class="text-lg text-gray-800">Condition: {record.condition}</div>
				<div class="text-lg text-gray-800">Description: {record.description}</div>
			</li>
		{/each}
	</ul>
</div>

<style>
	/* Add additional custom styles here to make it cute */
</style>
