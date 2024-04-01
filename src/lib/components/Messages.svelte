<script lang="ts">
	import { data } from "$lib/data"
	import devs from "./devs.json"

	const { close }: { close: () => void } = $props()

	const r = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)]

	const im = ["I'm", "I am"]
	const f = ["if", "whether", "whether or not"]
	const yd = ["you'd", "you would"]
	const yr = ["you're", "you are"]
	const punc = [".", ".", ".", ".", "!"]
	const maybeComma = ["", "", "", "", ","]
	const n = ["a revival", "your revival", $data.name]
	const c = [
		"could be able to",
		"could",
		"would be able to",
		"would",
		"might be able to",
		"may be able to",
		"may",
		"can",
	]
	const t = ["think", "believe", "feel", "assume", "presume"]
	const dp = ["develop", "programm"]
	const s = [
		"noticed",
		"saw",
		"found out",
		"happened to find out",
		"heard",
		"learned",
		"realised",
		"discovered",
		"was informed",
		"was told",
	]
	const rs = [
		"were a _st _dper",
		"were working on _rn",
		"were _dping _rn",
		"worked with _st",
	]
	const a = ["and", "so"]
	const yow = ["", " you", " out", " you out"]

	const parts = [
		[
			"Hi,",
			"Hello,",
			"Hey!",
			"Yo",
			"Greetings.",
			"Salutations.",
			"Sup",
			"Hi there!",
			"Hello there!",
			"Hey there!",
			"What's up?",
			"Hey,",
			"Howdy!",
			"Hiya!",
			"Heya!",
			"Good day,",
		],
		[
			"_ri",
			"My name is",
			"I go by",
			"_ri known as",
			"_ri called",
			"It's me,",
			"It is I,",
			"I am",
		],
		[
			"I was wondering",
			"I wanted to know",
			"_ri curious",
			"_ri interested in knowing",
			"_ri wondering",
			"_ri messaging to ask",
			"_ri reaching out to ask",
		],
		[
			"_ryd like to collaborate on _rn",
			"_ryd be interested in working together",
			"_ryd like to work on something together",
			"_ryd be interested in a collaboration",
			"I _rc work with you on _rn",
			"I _rc help_yow with _rn",
			"I _rc assist you with _rn",
			"I _rc work on _rn with you",
			"I _rc work on _rn",
			"we _rc work together on _rn",
			"we _rc collaborate on _rn",
			"we _rc work on _rn together",
			"we _rc both work on _rn",
			"you and I _rc work on _rn together",
			"you and I _rc collaborate on _rn",
			"you and I _rc work together on _rn",
			"you and I _rc work on _rn",
			"I _rc volunteer to work on _rn",
			"I _rc volunteer to help_yow with _rn",
			"I _rc volunteer to assist with _rn",
			"I _rc volunteer to work on _rn with you",
			"I _rc volunteer to work on _rn",
		],
		[
			"_ri a _ts _dper",
			"I work with _ts",
			"I am familiar with _ts",
			"I have experience with _ts",
		],
		[
			"I _rc help_yow the development of _rn",
			"I _rc help_yow its development",
			"I _rc help_yow with _rn",
			"I _rc help_yow with it",
			"I _rt I _rc contribute to _rn",
			"I _rt I _rc contribute to it",
		],
		[
			"Let me know if _ryr interested.",
			"Let me know if _ryd like to collaborate.",
			"Let me know if _ryd like to work together.",
			"Let me know if _ryd like to work on something together.",
		]
	]

	const constructMessage = () => {
		const sender: {
			name: string
			username: string
			skills: string[]
			skillNames: string[]
		} = r(devs)
		let skills = sender.skillNames
			.join(", ")
			.replace(/, ([^,]*)$/, ", and $1")

		// ensure there's no comma before the "and" if there are only 2 skills
		if (sender.skillNames.length === 2) skills = skills.replace(/, /, " ")

		const additional =
			Math.random() > 0.5
				? `I ${r(s)} ${r(["that", ""])} you ${r(rs)} ${r(a)}`
				: ""

		// hellish
		let message = `${r(parts[0])} ${r(parts[1])} ${sender.name}${r(punc)}

${additional} ${r(parts[2])}${r(maybeComma)} ${r(f)} ${r(parts[3])}${r(punc)} ${r(parts[4])} ${r(a)} ${r(parts[5])}${r(punc)}


`

		for (let i = 0; i < 4; i++)
			message = message
				.replace("_ri", r(im))
				.replace("_ryd", r(yd))
				.replace("_ryr", r(yr))
				.replace("_rn", r(n))
				.replace("_rc", r(c))
				.replace("_rt", r(t))
				.replace("_ts", skills)
				.replace("_st", $data.stack)
				.replace("_dp", r(dp))
				.replace("_yow", r(yow))
				.replace("\n", "<br />")

		return { sender, message }
	}

	const messages: {
		sender: { name: string; username: string }
		message: string
	}[] = []
	for (let i = 0; i < 10; i++) messages.push(constructMessage())
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
		class="translate--1/2 w-180 h-120 rounded-4 absolute left-1/2 top-1/2 overflow-y-auto border-neutral-700 bg-neutral-800 py-4">
		<legend class="pl-4">messages</legend>

		<div
			class="border-b-1 flex flex-col border-0 border-solid border-neutral-600 pt-6">
			{#each messages as { sender, message }}
				<!-- make every 2nd row darker -->
				<button
					class="message border-t-1 grid grid-cols-[1fr_2fr] border-0 border-solid border-neutral-600 bg-neutral-800 p-2 px-4 text-base text-white hover:brightness-125">
					<div class="flex gap-3">
						<img
							src="/devs/{sender.name}.png"
							alt={sender.name}
							class="border-1 rounded-full border-solid border-neutral-700" />
						<div class="flex flex-col text-left">
							<b>{sender.name}</b>
							<span class="text-neutral-500">
								@{sender.username}
							</span>
						</div>
					</div>
					<p class="line-clamp-55 pt-1 text-left text-sm">
						{@html message}
					</p>
				</button>
			{/each}
		</div>
	</div>
</div>

<style lang="stylus">
	.message:nth-child(2n-1)
		@apply bg-neutral-900
</style>
