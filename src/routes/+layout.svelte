<script lang="ts">
	import { data } from "$lib/data"
	import Messages from "$lib/components/Messages.svelte"

	import "/src/global.styl"
	import "uno.css"
	import { fade } from "svelte/transition"

	const stacks = [
		{
			name: "php",
			colour: [81, 91, 147],
			locked: false,
			description:
				"The classic choice for any revival. With fast development iterations and footguns for the inexperienced, it's perfect for the average revival that'll die within the year anyway.",
		},
		{
			name: "c# & asp.net",
			colour: [186, 114, 216],
			locked: true,
			description:
				"A rock-solid foundation for a revival that's in it for the long haul. Chosen by Roblox, easy testing, high performance, and allows easy integration with clients.",
		},
		{
			name: "php & laravel",
			colour: [243, 39, 47],
			locked: true,
			description:
				"Adding a modern twist to PHP, Laravel is a powerful framework that prioritises developer happiness and velocity. Perfect for a revival that wants to get things done quickly, though perhaps not the most performant.",
		},
		{
			name: "node.js",
			colour: [68, 126, 57],
			locked: true,
			description:
				"A runtime previously known for its speed and scalability, though stil holds up strongly today. Write your frontend and backend in the same language, and utilise a wide range of Node.js tools available in the ORC.",
		},
		{
			name: "svelte & sveltekit",
			colour: [249, 53, 12],
			locked: true,
			description:
				"A newer contender that's quickly gaining popularity amongst revivals. With a focus on flexibility, security, and speed, it's a great choice for a revival that wants to stay ahead of the curve.",
		},
		{
			name: "react & next",
			colour: [0, 0, 0],
			locked: true,
			description:
				"A juggernaut in the frontend world, finally making its way into the ORC. A huge ecosystem and modern development patterns allow old features to be quickly revived and modernised.",
		},
		{
			name: "vue & nuxt",
			colour: [87, 186, 178],
			locked: true,
			description:
				"Combines the best of React and Svelte, with a focus on simplicity and performance yet still with mature tooling and a large community. Ideal for a stable and extensible revival on the bleeding edge.",
		},
		{
			name: "python & django",
			colour: [49, 171, 118],
			locked: true,
			description:
				"A fairly.. interesting choice? What it lacks in performance it makes up for in its ecosystem and ease of use. Certainly one of the options for a revival.",
		},
		{
			name: "ruby & rails",
			colour: [206, 0, 8],
			locked: true,
			description:
				"Touting fast development with a focus on convention over configuration, Rails may be an option for revivals that want to get things done quicker. Though be careful of performance problems, and good luck finding developers.",
		},
		{
			name: "htmx & go",
			colour: [30, 126, 156],
			locked: true,
			description:
				"Blazingly fast performance with blazingly slow development. Different may not always mean better, but it's a possibility if you're not as confident on the  frontend.",
		},
		{
			name: "rust",
			colour: [242, 70, 12],
			locked: true,
			description:
				"Can you possibly need this much performance? Keep your revival secure for memory overflow bugs in the five months it'll be alive.",
		},
		{
			name: "wix",
			colour: [255, 255, 255],
			locked: true,
			description: "You have no idea what you're doing, do you?",
		},
	]

	$effect(() => {
		const storedData = localStorage.getItem("data")
		if (!storedData) return

		const loadedData = JSON.parse(storedData)
		$data = loadedData
	})

	$effect(() => {
		localStorage.setItem("data", JSON.stringify($data))
	})

	let currentDescription = $state(
		"Hover over a tech stack to view its description.",
	)

	const setDescription = (desc: string, locked: boolean) => () =>
		(currentDescription = locked
			? desc
					.split("")
					.map(c => (c.match(/[a-zA-Z]/) ? "?" : c))
					.join("")
			: desc)

	let messagesOpen = $state(true)
</script>

{#if $data.stage == "name"}
	<div
		class="rounded-4 absolute left-1/2 top-20 w-80 -translate-x-1/2
		border border-solid border-neutral-700 bg-neutral-800 p-4">
		choose a name for your revival

		<form onsubmit={() => ($data.stage = "stack")} class="pt-3">
			<input
				required
				minlength="3"
				maxlength="21"
				class="rounded-2 w-full bg-neutral-900 px-3 py-2 text-white"
				placeholder="name"
				bind:value={$data.name} />
			<!-- ^ ? -->

			<div class="pt-3">
				<button
					class="rounded-2 border-none bg-blue-500 px-4 py-1
					text-base text-white duration-100 hover:bg-blue-600">
					next
				</button>
			</div>
		</form>
	</div>
{:else if $data.stage == "stack"}
	<div
		class="rounded-4 w-120 absolute left-1/2 top-20 -translate-x-1/2 border border-solid border-neutral-700 bg-neutral-800 p-4">
		choose a tech stack for {$data.name}

		<div class="grid grid-cols-2 gap-3 pt-3">
			{#each stacks as { name, colour, locked, description }}
				<button
					onclick={() => {
						if (locked) return
						$data.stack = name
						$data.stage = "game"
					}}
					onmouseover={setDescription(description, locked)}
					onfocus={setDescription(description, locked)}
					class="rounded-2 hover:brightness-120 border-none px-4 py-1 text-base duration-100 active:brightness-110"
					style={locked
						? "background:black;color:#333"
						: `background:rgb(${colour});color: ${
								(colour[0] + colour[1] + colour[2]) / 3 > 127
									? "black"
									: "white"
							}`}>
					{locked
						? name
								.split("")
								.map(c => (c == " " ? " " : "?"))
								.join("")
						: name}
				</button>
			{/each}
		</div>
		<p class="text-center">
			{currentDescription}
		</p>
	</div>
{:else if $data.stage == "game"}
	<div class="flex justify-between gap-4">
		<span>Revival Clicker</span>

		<div class="flex gap-4">
			<span class="text-yellow">{$data.name}</span>

			{#if $data.started.development}
				<span class="text-green">
					{Math.floor($data.development)} development
				</span>
			{/if}
		</div>

		<div>
			{#if $data.started.messages}
				<button
					onclick={() => {}}
					class="text-red hover:text-red-6 bg-transparent text-base">
					{#if $data.unreadMessages > 0}
						{$data.unreadMessages} messagesOpen
					{:else}
						0
					{/if}
				</button>
			{/if}
		</div>
	</div>
	<!-- Tile layout for boxes -->
	<main
		class="flex flex-col flex-wrap content-start justify-start gap-4 overflow-hidden pt-4">
		<slot />
		{#if messagesOpen}
			<div transition:fade={{ duration: 200 }}>
				<Messages close={() => (messagesOpen = false)} />
			</div>
		{/if}
	</main>
{/if}

<style lang="stylus">
	:global(p)
		margin 0
</style>
