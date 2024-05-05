<script lang="ts">
	import { data } from "$lib/data"

	const upgrades = [
		{
			name: "pc",
			desc: "upgrade your pc to develop faster",
			costs: (lvl: number) => Math.ceil(1.25 ** (lvl * 2) + 3),
			requires: () => true,
			maxLevel: 28,
			onPurchase: () => $data.devUpgrades.pc++
		},
		{
			name: "skill",
			desc: "upgrade your skill to earn more development per click",
			costs: (lvl: number) => Math.floor(2.1 ** (lvl + 4) * 4),
			requires: () => $data.devUpgrades.pc > 1,
			maxLevel: 9,
			onPurchase: () => $data.devUpgrades.skill++
		},
		{
			name: "storage",
			desc: "upgrade your storage to store more development",
			// if this is ever greater than max development, the game would be impossible
			costs: (lvl: number) =>
				Math.floor(((lvl - 0.01) * 10 + 6.31) ** 2.1),
			requires: () => $data.devUpgrades.skill > 0,
			maxLevel: 99,
			onPurchase: () => $data.devUpgrades.storage++
		}
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
				$data.maxDevelopment
					? 'bg-red-5'
					: cost > $data.development
						? 'bg-neutral-5'
						: 'bg-green-5 hover:bg-green-6 active:bg-green-7'}">
				{cost} dev
			</button>
		</div>
	{/if}
{/each}
