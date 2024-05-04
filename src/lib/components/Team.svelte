<script lang="ts">
	import { data } from "$lib/data"

	$effect(() => {
		const intervals: number[] = []
		for (const dev of $data.devs) {
			const interval = setInterval(() => {
				$data.development += 0.02
			}, 100)
			
			intervals.push(interval)
		}
		return () => {
			for (const interval of intervals) clearInterval(interval)
		}
	})
</script>

<div class="flex flex-col gap-3">
	{#each $data.devs as dev}
		<div class="flex gap-3 items-center">
			<img
				src="/devs/{dev.name}.png"
				alt={dev.name}
				class="border-1 rounded-full border-solid border-neutral-7" />
			<div class="text-left">
				<b>{dev.name}</b>
				<div class="text-neutral-4 pt-1">
					{dev.role}
				</div>
				<div class="text-green pt-1">
					(+0.2 dev/sec)
				</div>
			</div>
		</div>
	{/each}
</div>
