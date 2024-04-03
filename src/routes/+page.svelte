<script lang="ts">
	import { data } from "$lib/data"
	import Develop from "$lib/components/Develop.svelte"
	import DevUpgrades from "$lib/components/DevUpgrades.svelte"
	import RevivalUpgrades from "$lib/components/RevivalUpgrades.svelte"
	import Team from "$lib/components/Team.svelte"
	import Info from "$lib/components/Info.svelte"
</script>

<fieldset>
	<legend>
		Development
		<Info>
			Hit the develop button to earn development. You must wait for it to
			finish before you can develop again. You can spend development on
			various upgrades!
		</Info>
	</legend>

	<Develop />
</fieldset>

{#if $data.started.development}
	<fieldset>
		<legend>
			Development upgrades
			<Info>
				Purchasing the upgrades here will help you develop faster.
				Upgrades are purchased with development.
			</Info>
		</legend>

		<DevUpgrades />
	</fieldset>
{/if}

{#if $data.devUpgrades.pc > 4}
	<fieldset>
		<legend>
			Revival upgrades
			<Info>
				These upgrades are what make your revival what it is. Keep
				buying them to increase your development progress until the
				revival is complete!
			</Info>
		</legend>

		<RevivalUpgrades />
	</fieldset>
{/if}

{#if $data.devs.length > 0}
	<fieldset>
		<legend>
			Your team
			<Info>yeah</Info>
		</legend>
		<Team />
	</fieldset>
{/if}

<fieldset>
	<legend>stuff</legend>
	<button
		onclick={() => {
			localStorage.clear()
			location.reload()
		}}>
		clear data
	</button>
</fieldset>
