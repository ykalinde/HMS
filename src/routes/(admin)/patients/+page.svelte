<script lang="ts">
	let patients = [
		{ id: 1, name: 'John Doe', age: 35, gender: 'Male' },
		{ id: 2, name: 'Jane Smith', age: 28, gender: 'Female' },
		{ id: 3, name: 'Alice Johnson', age: 42, gender: 'Female' }
		// Add more patient data as needed
	];
</script>

<header class="py-5 border-b border-gray-100 mb-10 flex justify-between">
	<div>
		<h1 class="text-3xl mb-1">Patients</h1>
		<p class="text-xs text-gray-400">Well here is kanda short description</p>
	</div>
	<nav>
		<button class="bg-black text-white px-8 py-2 rounded-md"> Create </button>
	</nav>
</header>

<div class="">
	<table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
		<thead class="bg-gray-800 text-white">
			<tr>
				<th class="py-2 px-4 text-left">ID</th>
				<th class="py-2 px-4 text-left">Name</th>
				<th class="py-2 px-4 text-left">Age</th>
				<th class="py-2 px-4 text-left">Gender</th>
			</tr>
		</thead>
		<tbody>
			{#each patients as patient (patient.id)}
				<tr class="hover:bg-gray-200">
					<td class="py-2 px-4">{patient.id}</td>
					<td class="py-2 px-4">{patient.name}</td>
					<td class="py-2 px-4">{patient.age}</td>
					<td class="py-2 px-4">{patient.gender}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
