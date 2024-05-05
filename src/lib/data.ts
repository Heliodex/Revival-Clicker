import { get, writable } from "svelte/store"
import upg from "./upgrades"
import message from "./message"
import allDevs from "./devs"

export const data = writable({
	development: 0,
	maxDevelopment: 0,
	stage: "name",
	name: "",
	stack: "",
	started: {
		development: false,
		upgrading: false,
	},
	devUpgrades: {
		pc: 0,
		skill: 0,
		storage: 0,
	},
	messages: [] as {
		sender: { name: string; username: string }
		message: string
		type: string
		time: number
		hired: boolean
	}[],
	unreadMessages: 0,
	devs: [] as {
		name: string
		username: string
		role: string
	}[],
	revivalUpgrades: [] as string[],
})

data.subscribe(d => {
	const maxDevelopment = (d.devUpgrades.storage * 10 + 6.31) ** 2.1

	d.maxDevelopment = maxDevelopment
	if (d.development > maxDevelopment) d.development = maxDevelopment
	return d
})

const upgrades: {
	name: string
	cost: number
	dependsOn?: string[]
}[] = []
// Having upgrades in arrays instead of objects makes it easier to write
function parseUpgrade(upgrade: (typeof upg)[number], parentName?: string) {
	const [name, cost, dependsOn] = upgrade
	upgrades.push({
		name,
		cost,
		...(dependsOn.length > 0 ? { dependsOn } : {}),
	})
}

for (const upgrade of upg) parseUpgrade(upgrade)

export const filteredUpgrades = () =>
	upgrades.filter(
		u =>
			!get(data).revivalUpgrades.includes(u.name) &&
			(u.dependsOn
				? u.dependsOn.every(d => get(data).revivalUpgrades.includes(d))
				: true)
	)

export const revivalProgress = () =>
	(get(data).revivalUpgrades.length / upgrades.length) * 100

const requirements = [
	() => revivalProgress() >= 1,
	() => revivalProgress() >= 5,
	() => revivalProgress() >= 100,
	() => false,
]

const rand = () => (Math.random() + 0.2) * 1e4

// message handling
function messages() {
	console.log("checking", revivalProgress())
	setTimeout(messages, rand())
	const cdata = get(data)
	const unacceptedDevs = cdata.messages.filter(
		m => m.type === "application" && !m.hired
	)
	if (unacceptedDevs.length > 0) return
	if (!requirements[cdata.devs.length]()) return

	// pick a random dev
	const remainingDevs = allDevs.filter(
		d => !cdata.devs.map(d => d.username).includes(d.username)
	)

	if (remainingDevs.length === 0) return

	let devsMatchingStack = remainingDevs.filter(d =>
		d.skills.includes(cdata.stack)
	)
	if (devsMatchingStack.length === 0) {
		console.log("no devs matching stack", cdata.stack)
		if (Math.random() > 0.2) return
		devsMatchingStack = remainingDevs
	}

	const dev =
		devsMatchingStack[Math.floor(Math.random() * devsMatchingStack.length)]

	// if (messages.length === 0 && revivalProgress() > 5) {
	cdata.messages.push(message(dev))
	cdata.unreadMessages++
	data.set(cdata)
	// }
}

setTimeout(messages, rand())
