<script lang="ts">
	import type { Snippet } from "svelte"
	import { fade } from "svelte/transition"

	const { children }: { children: Snippet } = $props()

	let open = $state(false)
</script>

<button
	onclick={() => (open = !open)}
	class="bg-transparent p-0 text-xl {open ? '' : 'hover:brightness-75'}">
	ℹ️
	{#if open}
		<p
			onmouseout={() => (open = false)}
			onblur={() => (open = false)}
			transition:fade={{ duration: 100 }}
			class="absolute bg-white/90 text-black w-60 text-xs font-normal p-1 px-2 rounded-2 text-left">
			{@render children()}
		</p>
	{/if}
</button>

<style lang="stylus">

</style>
