<script lang="ts">
	import { data } from "$lib/data"
</script>

{#each $data.devs as dev}
	<div class="flex justify-between">
		<strong>{dev.name}</strong>
	</div>
{/each}
