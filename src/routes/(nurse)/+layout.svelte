<script lang="ts">
	import Expandable from '$lib/components/expandable.svelte';
</script>

<aside
	class="w-72 h-screen border-r border-gray-100 p-8 space-y-5 fixed top-0 left-0 bg-white flex flex-col"
>
	<div class="flex items-center space-y-2 space-x-4 border-b border-gray-200 pb-10">
		<div class="bg-gray-400 w-12 h-12 rounded-full flex items-center justify-center">
			<span class="material-symbols-outlined"> person </span>
		</div>

		<div class="">
            <div class="">
                <span>John Doe</span>
            </div>
            <span class="text-gray-500 text-sm">tamara@gmail.com</span>
        </div>
	</div>
	<nav class="h-[100%] flex flex-col justify-between">
		<ul>
			<li>
				<a
					href="/patients"
					class="flex items-center space-x-2 hover:bg-black hover:text-white py-1.5 px-2 rounded-md"
				>
					<span class="material-symbols-outlined text-gray-500"> analytics </span>
					<span>Patients</span>
				</a>
			</li>
			<li>
				<a
					href="/doctors"
					class="flex items-center space-x-2 hover:bg-black hover:text-white py-1.5 px-2 rounded-md"
				>
					<span class="material-symbols-outlined text-gray-500"> analytics </span>
					<span>Doctors</span>
				</a>
			</li>
			<li>
				<a
					href="/appointments"
					class="flex items-center space-x-2 hover:bg-black hover:text-white py-1.5 px-2 rounded-md"
				>
					<span class="material-symbols-outlined text-gray-500"> calendar_month </span>
					<span>Schedule</span>
				</a>
			</li>
			<li>
				<a
					href="/appointments"
					class="flex items-center space-x-2 hover:bg-black hover:text-white py-1.5 px-2 rounded-md"
				>
					<span class="material-symbols-outlined text-gray-500"> group </span>
					<span>Symptoms</span>
				</a>
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
