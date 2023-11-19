<script lang="ts">
	import { data } from "$lib/data"

	const upgrades = [
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

<div class="rounded-2 flex flex-col bg-neutral-900 p-2">
	<span class="pb-3">current revival progress</span>
	<div class="h-2.5 w-full rounded-full bg-neutral-700">
		<div
			class="h-2.5 rounded-full bg-blue-500 transition-all ease-out duration-500"
			style="width: {($data.revivalUpgrades.length / upgrades.length) * 100}%">
		</div>
	</div>
</div>

<div class="flex flex-col gap-2 pt-2">
	{#each upgrades.filter(u => !$data.revivalUpgrades.includes(u.name)) as upgrade}
		<div
			class="rounded-2 flex flex-wrap justify-between bg-neutral-800 p-2">
			<span class="pb-2">{upgrade.name}</span>
			<!-- <small class="block pb-2">
				{upgrade.desc}
			</small> -->

			<button
				onclick={() => {
					if ($data.development < upgrade.cost) return
					$data.development -= upgrade.cost
					$data.revivalUpgrades.push(upgrade.name)
				}}
				class="ms-auto h-6 rounded px-2 py-1 text-white {upgrade.cost >
				$data.development
					? 'bg-red-500'
					: 'bg-green-500 hover:bg-green-600 active:bg-green-700'}">
				{upgrade.cost} dev
			</button>
		</div>
	{/each}
</div>
