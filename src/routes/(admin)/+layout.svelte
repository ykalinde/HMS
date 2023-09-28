<aside class="w-72 h-screen border-r border-gray-100 p-8 space-y-5 fixed top-0 left-0 bg-white">
	<div class="flex flex-col items-center space-y-2 border-b border-gray-200 pb-10">
		<div class="bg-gray-400 w-20 h-20 rounded-full flex items-center justify-center">
			<span class="material-symbols-outlined"> person </span>
		</div>

		<div class="">Tamara@gmail.com</div>
	</div>
	<nav>
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
				<a
					href="/patients"
					class="flex items-center space-x-2 hover:bg-black hover:text-white py-1.5 px-2 rounded-md"
				>
					<span class="material-symbols-outlined"> analytics </span>
					<span>Patients</span>
				</a>
			</li>
			<li>
				<a
					href="/nurses"
					class="flex items-center space-x-2 hover:bg-black hover:text-white py-1.5 px-2 rounded-md"
				>
					<span class="material-symbols-outlined"> analytics </span>
					<span>Nurses</span>
				</a>
			</li>
			<li>
				<a
					href="/doctors"
					class="flex items-center space-x-2 hover:bg-black hover:text-white py-1.5 px-2 rounded-md"
				>
					<span class="material-symbols-outlined"> analytics </span>
					<span>Doctors</span>
				</a>
			</li>
		</ul>
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
