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

<header class="py-5 border-b border-gray-100 mb-10">
	<h1 class="text-3xl mb-1">Dashboard</h1>
	<p class="text-xs text-gray-400">Well here is kanda short description</p>

	<nav />
</header>

<Expandable title={"tbalis"}>
	<div class="">
		<p>Helow</p>
	</div>
</Expandable>

<section class=" flex space-x-6">
	<div class="bg-white px-8 py-5 shadow rounded-md">
		<div class="">
			<span class="font-bold text-4xl">{data.patients.length}</span>
			<span class="text-gray-400 uppercase text-xs">patients</span>
		</div>

		<div class="text-sm">
			<div class="flex items-center space-x-2">
				<span class="text-gray-400">visits:</span>
				<div class="flex items-center space-x-1 text-green-600">
					<span class="font-bold">38%</span>
					<div
						class="bg-green-600 w-5 h-5 rounded-full text-white flex items-center justify-center"
					>
						<span class="material-symbols-outlined !text-xs"> trending_up </span>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="bg-white px-8 py-5 shadow rounded-md">
		<div class="">
			<span class="font-bold text-4xl">{data.nurses.length}</span>
			<span class="text-gray-400 uppercase text-xs">nurses</span>
		</div>

		<div class="text-sm">
			<div class="flex items-center space-x-2">
				<span class="text-gray-400">visits:</span>
				<div class="flex items-center space-x-1 text-green-600">
					<span class="font-bold">38%</span>
					<div
						class="bg-green-600 w-5 h-5 rounded-full text-white flex items-center justify-center"
					>
						<span class="material-symbols-outlined !text-xs"> trending_up </span>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="bg-white px-8 py-5 shadow rounded-md">
		<div class="">
			<span class="font-bold text-4xl">{data.doctors.length}</span>
			<span class="text-gray-400 uppercase text-xs">doctors</span>
		</div>

		<div class="text-sm">
			<div class="flex items-center space-x-2">
				<span class="text-gray-400">visits:</span>
				<div class="flex items-center space-x-1 text-green-600">
					<span class="font-bold">38%</span>
					<div
						class="bg-green-600 w-5 h-5 rounded-full text-white flex items-center justify-center"
					>
						<span class="material-symbols-outlined !text-xs"> trending_up </span>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="bg-white px-8 py-5 shadow rounded-md">
		<div class="">
			<span class="font-bold text-4xl">98</span>
			<span class="text-gray-400 uppercase text-xs">patients</span>
		</div>

		<div class="text-sm">
			<div class="flex items-center space-x-2">
				<span class="text-gray-400">visits:</span>
				<div class="flex items-center space-x-1 text-green-600">
					<span class="font-bold">38%</span>
					<div
						class="bg-green-600 w-5 h-5 rounded-full text-white flex items-center justify-center"
					>
						<span class="material-symbols-outlined !text-xs"> trending_up </span>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="w-[50%] mt-8">
	<canvas bind:this={chartCanvas} id="myChart" class="bg-white p-4 shadow-md rounded-md" />
</section>
