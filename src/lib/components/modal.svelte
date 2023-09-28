<script lang="ts">
	export let showModal: boolean; // boolean

	let dialog: any; // HTMLDialogElement

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	class="relative backdrop:bg-black backdrop:bg-opacity-30 p-6 rounded-md"
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<div class="mb-4">
			<slot name="title" />
            <!-- svelte-ignore a11y-autofocus -->
			<button class="absolute top-6 right-6 bg-gray-300 rounded-full flex justify-center items-center h-6 w-6" autofocus on:click={() => dialog.close()}>
				<span class="material-symbols-outlined"> close </span>
			</button>
		</div>
		<slot />
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
