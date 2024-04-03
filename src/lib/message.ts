import { data } from "$lib/data"
import { get } from "svelte/store"

const r = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]

const im = ["I'm", "I am"]
const f = ["if", "whether", "whether or not"]
const yd = ["you'd", "you would"]
const yr = ["you're", "you are"]
const punc = [".", ".", ".", ".", "!"]
const k = [
	"Let me know",
	"Please let me know",
	"Notify me",
	"Please inform me",
	"Do tell me",
	"Please tell me",
]
const c = [
	"could be able to",
	"could",
	"would be able to",
	"might be able to",
	"may be able to",
]
const t = ["think", "believe", "feel", "assume", "presume"]
const h = ["that", ""]
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
const part1 = [
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
]
const part2 = [
	"_ri",
	"_ri",
	"_ri",
	"My name is",
	"I go by",
	"_ri known as",
	"_ri called",
	"It's me,",
	"It is me,",
	"It is I,",
]
const part3 = [
	"I was wondering",
	"I wanted to know",
	"_ri curious",
	"_ri interested in knowing",
	"_ri wondering",
	"_ri messaging to ask",
	"_ri reaching out to ask",
]
const part4 = [
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
]
const part5 = [
	"_ri a _ts _dper",
	"I work with _ts",
	"I am familiar with _ts",
	"I have experience with _ts",
]
const part6 = [
	"I _rc help_yow the development of the revival",
	"I _rc help_yow the development of _tn",
	"I _rc help_yow its development",
	"I _rc help_yow with the revival",
	"I _rc help_yow with _tn",
	"I _rc help_yow with it",
	"I _rt I _rc contribute to _tn",
	"I _rt I _rc contribute to the revival",
	"I _rt I _rc contribute to it",
]
const part7 = [
	"if _ryr interested",
	"if _ryr interested in a collaboration",
	"if _ryr interested in a collaborating",
	"if _ryd like to collaborate_mn",
	"if _ryd like to work together_mn",
	"if _ryd like to work_mn together",
	"if _ryd like to work on something together",
]
const part8 = [
	"Best regards,",
	"Kind regards,",
	"Yours sincerely,",
	"Yours faithfully,",
	"Yours truly,",
	"Yours,",
	"All the best,",
]

const msg = (statement: TemplateStringsArray, ...substitutions: string[][]) =>
	statement.raw.reduce(
		(query, part, index) =>
			query +
			part +
			(index < substitutions.length ? r(substitutions[index]) : ""),
		""
	)

export default (sender: {
	name: string
	username: string
	skills: string[]
	skillNames: string[]
}) => {
	const n = ["a revival", "your revival", get(data).name]

	let skills = sender.skillNames.join(", ").replace(/, ([^,]*)$/, ", and $1")

	// ensure there's no comma before the "and" if there are only 2 skills
	if (sender.skillNames.length === 2) skills = skills.replace(/, /, " ")

	// hellish
	let message = msg`${part1} ${part2} _n${punc}

I ${s} ${h} you ${rs} ${a} ${part3} ${f} ${part4}${punc} ${part5} ${a} ${part6}${punc}

${k} ${part7}${punc}

${part8}
_n`

	for (let i = 0; i < 4; i++)
		message = message
			.replace("_mn", r(["", " on _rn"]))
			.replace("_ri", r(im))
			.replace("_ryd", r(yd))
			.replace("_ryr", r(yr))
			.replace("_rn", r(n))
			.replace("_rc", r(c))
			.replace("_rt", r(t))
			.replace("_dp", r(dp))
			.replace("_yow", r(yow))

	message = message
		.replaceAll("_n", sender.name)
		.replaceAll("_tn", get(data).name)
		.replaceAll("_ts", skills)
		.replaceAll("_st", get(data).stack)

	return {
		sender,
		message,
		type: "application",
		time: Date.now(),
		hired: false,
	}
}
