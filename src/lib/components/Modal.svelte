<script lang="ts">
	import type { Snippet } from "svelte"
	import { fade } from "svelte/transition"

	const {
		children,
		close
	}: {
		children: Snippet
		close: () => void
	} = $props()
</script>

<div
	transition:fade|global={{ duration: 200 }}
	class="size-screen absolute left-0 top-0 bg-black/50">
	<div
		role="button"
		class="size-screen absolute left-0 top-0"
		tabindex="0"
		onclick={close}
		onkeypress={close}>
	</div>
	<div
		class="translate--1/2 w-180 h-120 rounded-4 absolute left-1/2 top-1/2 overflow-y-auto border-neutral-7 bg-neutral-8 py-4">
		{@render children()}
	</div>
</div>
