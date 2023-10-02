<script lang="ts">
	import Expandable from '$lib/components/expandable.svelte';
</script>

<aside
	class="w-72 h-screen border-r border-gray-100 p-8 space-y-5 fixed top-0 left-0 bg-white flex flex-col"
>
	<div class="flex flex-col items-center space-y-2 border-b border-gray-200 pb-10">
		<div class="bg-gray-400 w-20 h-20 rounded-full flex items-center justify-center">
			<span class="material-symbols-outlined"> person </span>
		</div>

		<div class="">Tamara@gmail.com</div>
	</div>
	<nav class="h-[100%] flex flex-col justify-between">
		<ul>
			<li>
				<a
					href="/"
					class="flex items-center space-x-2 hover:bg-black hover:text-white py-1.5 px-2 rounded-md"
				>
					<span class="material-symbols-outlined"> analytics </span>
					<span>Dashboard</span>
				</a>
			</li>

			<li>
				<Expandable title="Users" icon="people" link="/users">
					<ul class="py-2 space-y-2">
						<li>
							<a
								href="/patients"
								class="flex items-center w-full px-2 py-1.5 text-gray-900 transition duration-75 rounded-lg pl-11"
								>Patients</a
							>
						</li>
						<li>
							<a
								href="/nurses"
								class="flex items-center w-full px-2 py-1.5 text-gray-900 transition duration-75 rounded-lg pl-11"
								>Nurses</a
							>
						</li>
						<li>
							<a
								href="/"
								class="flex items-center w-full px-2 py-1.5 text-gray-900 transition duration-75 rounded-lg pl-11"
								>Doctors</a
							>
						</li>
					</ul>
				</Expandable>
			</li>
		</ul>

		<div class="">
			<form action="/?logout" method="post">
				<button
					class="flex items-center space-x-2 hover:bg-black hover:text-white py-1.5 px-2 rounded-md"
				>
					<span class="material-symbols-outlined"> logout </span>
					<span>Logout</span>
				</button>
			</form>
		</div>
	</nav>
</aside>

<main class="pl-72">
	<div class="w-full px-8">
		<slot />
	</div>
</main>

<style>
	.material-symbols-outlined {
		font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
	}
</style>
