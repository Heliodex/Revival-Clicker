<script lang="ts">
	import { data } from "$lib/data"
	import stacks from "$lib/stacks"
	import Messages from "$lib/components/Messages.svelte"

	import "/src/global.styl"
	import "uno.css"

	const { children } = $props()

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
		"Hover over a tech stack to view its description."
	)

	const setDescription = (desc: string, locked: boolean) => () =>
		(currentDescription = locked
			? desc
					.split("")
					.map(c => (c.match(/[a-zA-Z]/) ? "?" : c))
					.join("")
			: desc)

	let messagesOpen = $state(false)
</script>

{#if $data.stage == "name"}
	<div
		class="rounded-4 absolute left-1/2 top-20 w-140 -translate-x-1/2
		border border-solid border-neutral-700 bg-neutral-800 p-4">
		<p>
			The year is {new Date().getFullYear()}. <!-- lmao --> The Old Roblox
			Community is still alive, but barely. Shit(vi)vals are the only projects
			that seem to gain any traction, and even then they never survive for
			more than a few months. The community remains more toxic than ever, fuelled
			by broken dreams of the past and the lack of anything new or exciting.
			<br />
			<br />

			Enough is enough. You've decided to take matters into your own hands
			and create a revival to finally break the ORC out of its vicious
			downward spiral. You've got the skills, the experience, and the
			drive to make it happen. But where do you start?
		</p>

		<br />
		<hr />
		<br />

		Welcome to Revival Clicker.
		<br />
		To begin,
		<ins>Choose a name for your revival.</ins>

		<form onsubmit={() => ($data.stage = "stack")} class="pt-3">
			<input
				required
				minlength="3"
				maxlength="21"
				class="rounded-2 w-full bg-neutral-900 px-3 py-2 text-white max-w-80"
				placeholder="Name your revival"
				bind:value={$data.name} />
			<!-- ^ ? -->

			<div class="pt-3">
				<button
					class="rounded-2 border-none bg-emerald-5 hover:bg-emerald-6 px-4 py-1 text-base text-white duration-100">
					Next
				</button>
			</div>
		</form>
	</div>
{:else if $data.stage == "stack"}
	<div
		class="rounded-4 w-140 absolute left-1/2 top-20 -translate-x-1/2 border border-solid border-neutral-7 bg-neutral-8 p-4">
		<p>
			The next most important thing after a revival's name is its
			technology. The tech stack you choose will determine the tools and
			developers you'll have available, and the performance and
			scalability of your revival.
			<br />
			<br />

			Security vulnerabilities introduced during development can easily
			lead to the downfall of your revival, so it's important to choose a
			modern set of technologies that you're comfortable with.
		</p>

		<br />

		<ins>Choose a tech stack for {$data.name}.</ins>

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
		<p class="text-center pt-4">
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
					<abbr title="{$data.development} development">
						{Math.floor($data.development)}
					</abbr>
					development
				</span>
			{/if}
		</div>

		<div>
			{#if $data.messages.length > 0}
				<button
					onclick={() => {
						messagesOpen = true
						$data.unreadMessages = 0
					}}
					class="text-red hover:text-red-6 bg-transparent text-base">
					{#if $data.unreadMessages > 0}
						{$data.unreadMessages} unread message{$data.unreadMessages >
						1
							? "s"
							: ""}
					{:else}
						messages
					{/if}
				</button>
			{/if}
		</div>
	</div>
	<!-- Tile layout for boxes -->
	<main
		class="flex flex-col flex-wrap content-start justify-start gap-4 overflow-y-hidden pt-4">
		{@render children()}
		{#if messagesOpen}
			<Messages close={() => (messagesOpen = false)} />
		{/if}
	</main>
{/if}
