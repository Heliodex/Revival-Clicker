<script lang="ts">
	import { data } from "$lib/data.svelte"

	let upgrades = [
		{
			id: "pc",
			name: "upgrade pc",
			desc: "upgrade your pc to develop faster",
			costs: (lvl: number) => Math.ceil(1.22 ** (lvl * 2)),
			maxLevel: 26,
			onPurchase: () => $data.devUpgrades.pc++,
		},
		{
			id: "skill",
			name: "upgrade skill",
			desc: "upgrade your skill to earn more development per click",
			costs: (lvl: number) => Math.floor(2.1 ** (lvl + 4)),
			maxLevel: 9,
			onPurchase: () => $data.devUpgrades.skill++,
		},
	] as const
</script>

{#each upgrades.filter(u => $data.devUpgrades[u.id] < u.maxLevel) as upgrade}
	{@const cost = upgrade.costs($data.devUpgrades[upgrade.id])}
	<div class="rounded-2 mb-2 bg-neutral-900 p-2">
		<ins class="block">{upgrade.name}</ins>
		<small class="block pb-2">
			{upgrade.desc}
		</small>

		<button
			on:click={() => {
				// if ($data.development < cost) return
				// $data.development -= cost
				$data.started.upgrading = true
				upgrade.onPurchase()
			}}
			class="block rounded px-2 py-1 text-white {cost > $data.development
				? 'bg-red-500'
				: 'bg-green-500 hover:bg-green-600 active:bg-green-700'}">
			{cost} dev
		</button>
	</div>
{/each}
