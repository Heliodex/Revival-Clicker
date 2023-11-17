<script lang="ts">
	import { data } from "$lib/data.svelte"

	import "/src/global.styl"
	import "uno.css"

	$effect(() => {
		const storedData = localStorage.getItem("data")
		if (!storedData) return

		const loadedData = JSON.parse(storedData)
		Object.assign(data, loadedData)
	})

	$effect(() => {
		localStorage.setItem("data", JSON.stringify(data))
	})
</script>

<div class="flex gap-4">
	<span>Revival Clicker</span>

	<span class="text-green">{data.development} development</span>
</div>

<!-- Tile layout for boxes -->
<main class="flex flex-col flex-wrap gap-4 pt-4 overflow-hidden
align-content-start justify-content-start">
	<slot />
</main>
