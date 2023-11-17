<script lang="ts">
	import { data } from "$lib/data.svelte"
</script>

<!-- continuously increment on hold -->
<button
	class="cursor-pointer rounded border-none bg-blue-500 px-3 text-lg text-white
	transition duration-100 hover:bg-blue-600 active:bg-blue-700"
	on:click={() => data.development++}>
	develop
</button>

<p>
	you have {data.development} development
</p>
