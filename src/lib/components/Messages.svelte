<script lang="ts">
	import { data } from "$lib/data"

	const { close }: { close: () => void } = $props()

	type Message = {
		sender: { name: string; username: string }
		message: string
		type: string
		time: number
		hired: boolean
	}

	let currentMessage = $state<Message>()
</script>

<div class="size-screen absolute left-0 top-0 bg-black/50">
	<div
		role="button"
		class="size-screen absolute left-0 top-0"
		tabindex="0"
		onclick={close}
		onkeypress={close}>
	</div>
	<div
		class="translate--1/2 w-180 h-120 rounded-4 absolute left-1/2 top-1/2 overflow-y-auto border-neutral-7 bg-neutral-8 py-4">
		{#if currentMessage}
			{@const { sender, message, time, hired } = currentMessage}
			<button
				onclick={() => {
					currentMessage = undefined
					$data.unreadMessages = 0
				}}
				class="text-blue hover:text-blue-6 bg-transparent text-base p-0 pl-4">
				back
			</button>

			<div class="px-4">
				<div class="flex gap-3 pt-4 items-center">
					<img
						src="/devs/{sender.name}.png"
						alt={sender.name}
						class="border-1 rounded-full border-solid border-neutral-7" />
					<div class="flex flex-col text-left gap-1">
						<b>{sender.name}</b>
						<span class="text-neutral-4">
							@{sender.username}
						</span>
					</div>
				</div>
				<p class="pt-4 text-left text-white">
					{@html message.replaceAll("\n", "<br />")}
				</p>
				<i class="text-sm text-neutral-4">
					Sent {new Date(time).toLocaleString()}
				</i>

				<div class="pt-4">
					{#if hired}
						<button
							disabled
							class="bg-neutral-6 text-white text-base rounded-2 px-4 py-1 pointer-events-none">
							Hired!
						</button>
					{:else}
						<button
							onclick={() => {
								// you're hired
								if (currentMessage) currentMessage.hired = true
								$data.devs.push(sender)

							}}
							class="bg-green-5 hover:bg-green-6 active:bg-green-7 text-white text-base rounded-2 px-4 py-1">
							Hire
						</button>
					{/if}
				</div>
			</div>
		{:else}
			<legend class="pl-4">messages</legend>
			<div
				class="border-b-1 flex flex-col border-0 border-solid border-neutral-6 pt-6">
				{#each $data.messages.sort((a, b) => b.time - a.time) as msg}
					<button
						onclick={() => (currentMessage = msg)}
						class="message border-t-1 grid grid-cols-[1fr_2fr] border-0 border-solid border-neutral-6 bg-neutral-8 p-2 px-4 text-base text-white hover:brightness-125">
						<div class="flex gap-3">
							<img
								src="/devs/{msg.sender.name}.png"
								alt={msg.sender.name}
								class="border-1 rounded-full border-solid border-neutral-7" />
							<div class="flex flex-col text-left">
								<b>{msg.sender.name}</b>
								<span class="text-neutral-5">
									@{msg.sender.username}
								</span>
							</div>
						</div>
						<p class="line-clamp-2 pt-1 text-left text-sm">
							{msg.message}
						</p>
					</button>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style lang="stylus">
	// make every 2nd row darker
	.message:nth-child(2n-1)
		@apply bg-neutral-900
</style>
