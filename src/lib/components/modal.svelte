<script lang="ts">
	import { enhance } from '$app/forms';
	export let showModal: boolean; // boolean
	export let action: string | undefined = undefined;
	export let form: boolean = true;
	export let title: string;

	let dialog: any; // HTMLDialogElement

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	class="relative backdrop:bg-black backdrop:bg-opacity-30 rounded-md"
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		{#if form}
			<form {action} method="post" use:enhance>
				<div class="border-b border-gray-200">
					<div class="p-6">
						<h3 class="text-2xl font-semibold">{title}</h3>
					</div>

					<!-- svelte-ignore a11y-autofocus -->
					<button
						type="button"
						class="absolute top-6 right-6 bg-gray-300 rounded-full flex justify-center items-center h-6 w-6"
						on:click={() => dialog.close()}
					>
						<span class="material-symbols-outlined"> close </span>
					</button>
				</div>

				<div class="p-6">
					<slot />
				</div>

				<!-- Modal footer -->
				<div
					class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
				>
					<!-- svelte-ignore a11y-autofocus -->
					<button
						on:click={() => dialog.close()}
						autofocus
						type="submit"
						class="text-white bg-indigo-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>Submit</button
					>
					<button
						on:click={() => dialog.close()}
						type="button"
						class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-md border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
						>Close</button
					>
				</div>
			</form>
		{:else}
			<div>
				<div class="border-b border-gray-200">
					<div class="p-6">
						<h3 class="text-2xl font-semibold">{title}</h3>
					</div>

					<!-- svelte-ignore a11y-autofocus -->
					<button
						type="button"
						class="absolute top-6 right-6 bg-gray-300 rounded-full flex justify-center items-center h-6 w-6"
						on:click={() => dialog.close()}
					>
						<span class="material-symbols-outlined"> close </span>
					</button>
				</div>

				<div class="p-6">
					<slot />
				</div>

				<!-- Modal footer -->
				<div
					class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
				>
					<!-- svelte-ignore a11y-autofocus -->
					<button
						on:click={() => dialog.close()}
						type="button"
						class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-md border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
						>Close</button
					>
				</div>
			</div>
		{/if}
	</div>
</dialog>

<style>
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.material-symbols-outlined {
		font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
		font-size: 18px;
	}
</style>
