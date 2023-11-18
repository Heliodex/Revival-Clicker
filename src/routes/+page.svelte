<script lang="ts">
	import { data } from "$lib/data.svelte"
	import Develop from "$lib/components/Develop.svelte"
	import DevUpgrades from "$lib/components/DevUpgrades.svelte"
</script>

<div class="box">
	<Develop />
</div>

{#if $data.started.development}
	<div class="box">
		<DevUpgrades />
	</div>
{/if}

<div class="box">
	<button
		on:click={() => {
			localStorage.clear()
			location.reload()
		}}>
		clear data
	</button>
</div>
