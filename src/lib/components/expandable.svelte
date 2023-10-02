<script lang="ts">
	export let title: string;
	export let icon: string | undefined = undefined;
	export let link: string | undefined = undefined;

	let expanded: boolean = false;
</script>

<div>
	<button
		type="button"
		class="flex items-center w-full px-2 py-1.5 text-base text-gray-900 transition duration-75 rounded-md hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
		class:bg-gray-100={expanded}
		aria-controls="dropdown-example"
		data-collapse-toggle="dropdown-example"
		aria-expanded={expanded}
		on:click={() => (expanded = !expanded)}
	>
		{#if icon}
			<span class="material-symbols-outlined text-gray-500"> {icon} </span>
		{/if}

		<div class="flex items-center w-full justify-between">
			{#if link}
				<a href={link} class="inline-block"
					><span class="flex-1 ml-3 text-left whitespace-nowrap">{title}</span></a
				>
			{:else}
				<span class="flex-1 ml-3 text-left whitespace-nowrap">{title}</span>
			{/if}

			<div class="pr-1">
				<svg viewBox="0 0 20 20" fill="none">
					<path class="vert" d="M10 1V19" stroke="black" stroke-width="2" />
					<path d="M1 10L19 10" stroke="black" stroke-width="2" />
				</svg>
			</div>
		</div>
	</button>

	<div class:hidden={!expanded}>
		<slot />
	</div>
</div>

<style>
	button[aria-expanded='true'] .vert {
		display: none;
	}

	button:focus svg {
		outline: 2px solid;
	}

	button [aria-expanded='true'] rect {
		fill: currentColor;
	}

	svg {
		height: 0.7em;
		width: 0.7em;
	}

	.material-symbols-outlined {
		font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
	}
</style>
