<script lang="ts">
	import { tweened } from "svelte/motion"
	import { data } from "$lib/data"

	const pcs = [
		"none",
		"potato (literal)",
		"pocket calculator",
		"2010 samsung tablet",
		"amd phenom ii pc found in a skip",
		"gran's intel celeron lap top",
		"school-issued pentium chromebook",
		"the upgraded dell inspiron you found on ebay",
		"your dads old i5 thinkpad",
		"an overclocked fx-8350 rig running at 110°C",
		"actually decent ryzen 3 1200g starter pc",
		"a kaby lake i5 'gaming' pc from amazon",
		"an i7-8700 computer with a faulty psu",
		"the ryzen 7 3700x pc you got for christmas",
		"water-cooled beast i9 rig you built yourself",
		"a bare datacenter motherboard with dual xeons and 512gb ram",
		"triple-monitor 96-core threadripper 7995wx pc",
		"server rack with 4 epyc cpus and quad 3090s",
		"ibm z15 mainframe with 200 cores and 40tb ram",
		"d-wave quantum computer with 5000 qubits",
		"the entirety of aws us-east-1",
		"sierra supercomputer, 1.5 million cores and 125 petaflops",
		"hpe frontier, 1.1 exapflops, 8.6 million cores, 37000 gpus",
		"the folding@home network of over 4 million computers",
		"a botnet consisting of the entire internet",
		"harnessing the power of all human brains on earth to develop",
		"jupiter brain planet sized supercomputer",
		"matrioshka brain powered by dyson sphere, class b stellar engine",
		"the simulation itself",
	]
	const skills = [
		"n00b",
		"learner",
		"skript kiddie",
		"rookie",
		"coder",
		"programmer",
		"developer",
		"software engineer",
		"hacker",
		"technopathist",
	]

	let duration = $derived(5e4 / ($data.devUpgrades.pc ** 2 + 15))
	let amount = $derived(1 + $data.devUpgrades.skill ** 1.9)
	// increase progressBlur as duration decreases
	let progressBlur = $derived((1 / duration) * 50)

	let developing = $state(false)
	let progress = tweened(0)
</script>

{#if $data.started.upgrading}
	<div class="rounded-2 mb-2 bg-neutral-800 p-2">
		<div class="flex justify-between">
			<strong class="pe-8">PC</strong>
			<span>{pcs[$data.devUpgrades.pc]}</span>
		</div>
		<div class="flex justify-between">
			<strong class="w-30 pe-8">Skill level</strong>
			<span>{skills[$data.devUpgrades.skill]}</span>
		</div>
	</div>
{/if}

<button
	class="rounded-1.5 w-full cursor-pointer select-none bg-blue-500 text-lg text-white duration-100 hover:bg-blue-600 disabled:bg-blue-500"
	disabled={developing}
	style="--progress: {developing
		? $progress * (1 + progressBlur * 2) - progressBlur
		: 0}%; --blur: {progressBlur * 100}%"
	onmousedown={() => {
		if (developing) return
		developing = true

		progress = tweened(0, { duration })
		if (duration > 20) $progress = 100

		setTimeout(() => {
			$data.development += amount
			$data.started.development = true
			developing = false
		}, duration)
	}}>
	<div class="px-3 py-2">develop</div>
</button>

<style lang="stylus">
	// give the button a background gradient, acting as a progress bar
	button
		background-image linear-gradient(
			to right,
			rgba(255, 255, 255, 0.2) calc(var(--progress) - var(--blur)),
			transparent var(--progress)
		)
</style>
