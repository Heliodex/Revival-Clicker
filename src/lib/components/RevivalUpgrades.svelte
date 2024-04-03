<script lang="ts">
	import { fade } from "svelte/transition"
	import { data, filteredUpgrades, revivalProgress } from "$lib/data"

	let filtered = $state(filteredUpgrades())
	let progress = $state(revivalProgress())
	function recompute() {
		filtered = filteredUpgrades()
		progress = revivalProgress()
	}
	recompute()
</script>

<div class="rounded-2 flex flex-col bg-neutral-9 p-2">
	<span class="pb-3">current revival progress</span>
	<div class="h-2.5 w-full rounded-full bg-neutral-7">
		<div
			class="h-2.5 rounded-full bg-blue-5 transition-all duration-500 ease-out"
			style="width: {progress}%">
		</div>
	</div>
</div>

<div class="max-h-80vh flex flex-col gap-2 overflow-y-auto pt-2">
	{#each filtered as upgrade (upgrade.name)}
		<div transition:fade>
			<div
				class="rounded-2 flex flex-wrap justify-between bg-neutral-8 p-2">
				<span class="pb-2">{upgrade.name}</span>
				<!-- <small class="block pb-2">
					{upgrade.desc}
				</small> -->

				<button
					onclick={() => {
						if ($data.development < upgrade.cost) return
						$data.development -= upgrade.cost
						$data.revivalUpgrades.push(upgrade.name)
						recompute()
					}}
					class="ms-auto h-6 rounded px-2 py-1 text-white {upgrade.cost >
					$data.development
						? 'bg-red-5'
						: 'bg-green-5 hover:bg-green-6 active:bg-green-7'}">
					{upgrade.cost} dev
				</button>
			</div>
		</div>
	{/each}
</div>
