<script lang="ts">
	import { data } from "$lib/data.svelte"

	let upgrades = [
		{
			name: "begin site development",
			cost: 5,
		},
		{
			name: "acquire client",
			cost: 5,
		},
		{
			name: "acquire rccservice",
			cost: 5,
		},
	] as const
</script>

<div class="flex flex-col gap-2">
	{#each upgrades.filter(u => !$data.revivalUpgrades.includes(u.name)) as upgrade}
		<div
			class="rounded-2 flex flex-wrap justify-between bg-neutral-900 p-2">
			<span class="pb-2">{upgrade.name}</span>
			<!-- <small class="block pb-2">
				{upgrade.desc}
			</small> -->

			<button
				on:click={() => {
					if ($data.development < upgrade.cost) return
					$data.development -= upgrade.cost
					$data.revivalUpgrades.push(upgrade.name)
				}}
				class="flex-end ms-auto h-6 rounded px-2 py-1 text-white {upgrade.cost >
				$data.development
					? 'bg-red-500'
					: 'bg-green-500 hover:bg-green-600 active:bg-green-700'}">
				{upgrade.cost} dev
			</button>
		</div>
	{/each}
</div>
