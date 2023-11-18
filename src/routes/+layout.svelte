<script lang="ts">
	import { data } from "$lib/data.svelte"

	import "/src/global.styl"
	import "uno.css"

	const stacks = [
		{ name: "php", colour: [81, 91, 147], locked: false },
		{ name: "asp.net", colour: [186, 114, 216], locked: true },
		{ name: "php & laravel", colour: [243, 39, 47], locked: true },
		{ name: "svelte & sveltekit", colour: [249, 53, 12], locked: true },
		{ name: "react & next", colour: [47, 159, 201], locked: true },
		{ name: "ruby & rails", colour: [206, 0, 8], locked: true },
		{ name: "wix", colour: [255, 255, 255], locked: true },
	]

	$effect(() => {
		const storedData = localStorage.getItem("data")
		if (!storedData) return

		const loadedData = JSON.parse(storedData)
		$data = loadedData
	})

	$effect(() => {
		localStorage.setItem("data", JSON.stringify($data))
	})
</script>

{#if $data.stage == "name"}
	<div
		class="rounded-4 absolute left-1/2 top-20 w-80 -translate-x-1/2
		border border-solid border-neutral-700 bg-neutral-800 p-4">
		choose a name for your revival

		<form on:submit={() => ($data.stage = "stack")} class="pt-3">
			<input
				required
				minlength="3"
				maxlength="21"
				class="rounded-2 w-full bg-neutral-900 px-3 py-2 text-white"
				placeholder="name"
				bind:value={$data.name} />
			<!-- ^ ? -->

			<div class="pt-3">
				<button
					class="rounded-2 border-none bg-blue-500 px-4 py-1
					text-base text-white duration-100 hover:bg-blue-600">
					next
				</button>
			</div>
		</form>
	</div>
{:else if $data.stage == "stack"}
	<div
		class="rounded-4 absolute left-1/2 top-20 w-80 -translate-x-1/2
		border border-solid border-neutral-700 bg-neutral-800 p-4">
		choose a tech stack for your revival

		<div class="flex flex-col gap-3 pt-3">
			{#each stacks as { name, colour, locked }}
				<button
					on:click={() => {
						if (locked) return
						$data.stack = name
						$data.stage = "game"
					}}
					class="rounded-2 border-none px-4 py-1
					text-base duration-100 hover:bg-blue-600"
					disabled={locked}
					style={locked
						? "background:black;color:#333"
						: `background:rgb(${colour});color: ${
								(colour[0] + colour[1] + colour[2]) / 3 > 127
									? "black"
									: "white"
						  }`}>
					{locked
						? name
								.split("")
								.map(c => (c == " " ? " " : "?"))
								.join("")
						: name}
				</button>
			{/each}
		</div>
	</div>
{:else if $data.stage == "game"}
	<div class="flex gap-4">
		<span>Revival Clicker</span>
		<span class="text-yellow">{$data.name}</span>

		{#if $data.started.development}
			<span class="text-green">{$data.development} development</span>
		{/if}
	</div>
	<!-- Tile layout for boxes -->
	<main
		class="flex flex-col flex-wrap content-start justify-start gap-4
		overflow-hidden pt-4">
		<slot />
	</main>
{/if}
