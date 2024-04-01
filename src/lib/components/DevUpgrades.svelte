<script lang="ts">
	import { data } from "$lib/data"

	const upgrades = [
		{
			name: "pc",
			desc: "upgrade your pc to develop faster",
			costs: (lvl: number) => Math.ceil(1.25 ** (lvl * 2) * 4),
			requires: () => true,
			maxLevel: 28,
			onPurchase: () => $data.devUpgrades.pc++,
		},
		{
			name: "skill",
			desc: "upgrade your skill to earn more development per click",
			costs: (lvl: number) => Math.floor(2.2 ** (lvl + 4) * 4),
			requires: () => $data.devUpgrades.pc > 1,
			maxLevel: 9,
			onPurchase: () => $data.devUpgrades.skill++,
		},
	] as const
</script>

{#each upgrades.filter(u => $data.devUpgrades[u.name] < u.maxLevel) as upgrade}
	{#if upgrade.requires()}
		{@const cost = upgrade.costs($data.devUpgrades[upgrade.name])}
		<div class="rounded-2 mb-2 bg-neutral-800 p-2">
			<ins class="block">upgrade {upgrade.name}</ins>
			<small class="block pb-2">
				{upgrade.desc}
			</small>

			<button
				onclick={() => {
					if ($data.development < cost) return
					$data.development -= cost
					$data.started.upgrading = true
					upgrade.onPurchase()
				}}
				class="block rounded px-2 py-1 text-white {cost >
				$data.development
					? 'bg-red-500'
					: 'bg-green-500 hover:bg-green-600 active:bg-green-700'}">
				{cost} dev
			</button>
		</div>
	{/if}
{/each}
