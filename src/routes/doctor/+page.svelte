<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import chartjs from 'chart.js/auto';
	import Expandable from '$lib/components/expandable.svelte';

	export let data: PageData;

	let chartData;

	let chartValues = [20, 10, 5, 2, 20, 30, 45];
	let chartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
	let ctx;
	let chartCanvas: any;

	onMount(() => {
		ctx = chartCanvas.getContext('2d');

		var chart = new chartjs(ctx, {
			type: 'line',
			data: {
				labels: chartLabels,
				datasets: [
					{
						label: 'Visits',
						backgroundColor: 'rgb(255, 99, 132)',
						borderColor: 'rgb(255, 99, 132)',
						data: chartValues
					}
				]
			}
		});
	});
</script>

<header class="py-5 border-b border-gray-100 px-8">
	<h1 class="text-3xl mb-1">Dashboard</h1>
	<p class="text-xs text-gray-400">Well here is kanda short description</p>

	<nav />
</header>

<section class="bg-white dark:bg-gray-900">
	<div class="py-8 px-8 mx-auto max-w-screen-xl lg:py-8">
		<div
			class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12"
		>
			<h1 class="text-gray-900 dark:text-white text-3xl md:text-5xl font-extrabold mb-2">
				Welcome Dr. {data.user.firstname}
			</h1>
			<p class="text-lg font-normal text-gray-500 dark:text-gray-400 mb-6">
				Your commitment to excellence in patient care is the cornerstone of our healthcare
				community. Thank you for your unwavering dedication, compassion, and expertise.
			</p>
			<a
				href="/doctor/appointments"
				class="inline-flex justify-center items-center py-2.5 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
			>
				View Appointments
				<svg
					class="w-3.5 h-3.5 ml-2"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 14 10"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M1 5h12m0 0L9 1m4 4L9 9"
					/>
				</svg>
			</a>
		</div>
	</div>
</section>

<!-- Reports section -->
<section class="grid gap-6 md:grid-cols-2 p-8 lg:grid-cols-4">
	<!-- Showing Total Patients -->
	<div class="bg-white px-8 py-5 shadow rounded-md">
		<div class="flex space-x-4">
			<div class="bg-indigo-500 flex justify-center items-center w-10 h-10 rounded-md text-white">
				<span class="material-symbols-outlined"> group </span>
			</div>

			<div class="flex flex-col">
				<span class="text-sm text-gray-400">Total Patients</span>
				<span class="text-xl font-bold">20</span>
			</div>
		</div>

		<div class="">
			<a
				href="/doctor/patients"
				class="text-xs flex items-center text-gray-500 space-x-2 text-right justify-end hover:text-blue-500"
			>
				<span>View all</span>
				<span class="material-symbols-outlined"> arrow_right_alt </span>
			</a>
		</div>
	</div>

	<!-- Showing New Booking -->
	<div class="bg-white px-8 py-5 shadow rounded-md">
		<div class="flex space-x-4">
			<div class="bg-indigo-500 flex justify-center items-center w-10 h-10 rounded-md text-white">
				<span class="material-symbols-outlined"> group </span>
			</div>

			<div class="flex flex-col">
				<span class="text-sm text-gray-400">New Bookings</span>
				<span class="text-xl font-bold">20</span>
			</div>
		</div>

		<div class="">
			<a
				href=""
				class="text-xs flex items-center text-gray-500 space-x-2 text-right justify-end hover:text-blue-500"
			>
				<span>View all</span>
				<span class="material-symbols-outlined"> arrow_right_alt </span>
			</a>
		</div>
	</div>

	<!-- Showing Toda's Appointment Sessions -->
	<div class="bg-white px-8 py-5 shadow rounded-md">
		<div class="flex space-x-4">
			<div class="bg-indigo-500 flex justify-center items-center w-10 h-10 rounded-md text-white">
				<span class="material-symbols-outlined"> group </span>
			</div>

			<div class="flex flex-col">
				<span class="text-sm text-gray-400">Toda's Session</span>
				<span class="text-xl font-bold">20</span>
			</div>
		</div>

		<div class="">
			<a
				href=""
				class="text-xs flex items-center text-gray-500 space-x-2 text-right justify-end hover:text-blue-500"
			>
				<span>View all</span>
				<span class="material-symbols-outlined"> arrow_right_alt </span>
			</a>
		</div>
	</div>

	<!-- Showing All Appointments -->
	<div class="bg-white px-8 py-5 shadow rounded-md">
		<div class="flex space-x-4">
			<div class="bg-indigo-500 flex justify-center items-center w-10 h-10 rounded-md text-white">
				<span class="material-symbols-outlined"> group </span>
			</div>

			<div class="flex flex-col">
				<span class="text-sm text-gray-400">Appointments</span>
				<span class="text-xl font-bold">20</span>
			</div>
		</div>

		<div class="">
			<a
				href="/doctor/appointments"
				class="text-xs flex items-center text-gray-500 space-x-2 text-right justify-end hover:text-blue-500"
			>
				<span>View all</span>
				<span class="material-symbols-outlined"> arrow_right_alt </span>
			</a>
		</div>
	</div>
</section>


<section class="bg-white dark:bg-gray-900">
	<div class="py-8 px-8 grid lg:grid-cols-2 mx-auto max-w-screen-xl lg:py-8 gap-8">
		<!-- Showing today's sessions -->
		<div class="">
			<div class="relative overflow-x-auto">
				<div class="flex items-center justify-between pb-4 bg-white dark:bg-gray-900">
					<span class="font-bold">Sessions today</span>
				</div>
				<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead
						class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
					>
						<tr>
							<th scope="col" class="px-6 py-3"> Patient </th>
							<th scope="col" class="px-6 py-3"> Time </th>
							<th scope="col" class="px-6 py-3"> Condition </th>
						</tr>
					</thead>
					<tbody>
						<tr
							class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
						>
							<th
								scope="row"
								class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
							>
								<div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
									<span class="material-symbols-outlined"> personal_injury </span>
								</div>
								<div class="pl-3">
									<div class="text-base font-semibold">Neil Sims</div>
									<div class="font-normal text-gray-500">neil.sims@flowbite.com</div>
								</div>
							</th>
							<td class="px-6 py-4"> 7:30 PM </td>
							<td class="px-6 py-4">
								<div class="flex items-center">
									<div class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2" />
									General
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<!-- Showing the line chart with all appointments -->
		<div class="flex-1">
			<div class="flex items-center justify-between pb-4 bg-white dark:bg-gray-900">
				<span class="font-bold">Appointments</span>
			</div>
			<canvas
				bind:this={chartCanvas}
				id="myChart"
				class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3"
			/>
		</div>
	</div>
</section>

<style>
	.material-symbols-outlined {
		font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
	}
</style>
