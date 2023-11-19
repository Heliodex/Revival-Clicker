<script lang="ts">
	import { data } from "$lib/data"
	import Develop from "$lib/components/Develop.svelte"
	import DevUpgrades from "$lib/components/DevUpgrades.svelte"
	import RevivalUpgrades from "$lib/components/RevivalUpgrades.svelte"
</script>

<fieldset>
	<legend>development</legend>
	<Develop />
</fieldset>

{#if $data.started.development}
	<fieldset>
		<legend>development upgrades</legend>
		<DevUpgrades />
	</fieldset>
{/if}

{#if $data.started.upgrading}
	<fieldset>
		<legend>revival upgrades</legend>
		<RevivalUpgrades />
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
