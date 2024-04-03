import { get, writable } from "svelte/store"
import upg from "./components/upgrades.json"
import message from "./message"
import allDevs from "./components/devs.json"

export const data = writable({
	development: 0,
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
		peripherals: false,
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
	}[],
	revivalUpgrades: [] as string[],
})
type Upgrade = [string, number, Upgrade[] | undefined]

const upgrades: {
	name: string
	cost: number
	dependsOn?: string[]
}[] = []
// Having upgrades in arrays instead of objects makes it easier to write
const parseUpgrade = (upgrade: Upgrade, parentName?: string) => {
	const [name, cost, children] = upgrade
	upgrades.push({
		name,
		cost,
		...(parentName && { dependsOn: [parentName] }),
	})
	for (const child of children || []) parseUpgrade(child, name)
}

for (const upgrade of upg) parseUpgrade(upgrade as Upgrade)

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
	() => revivalProgress() >= 5,
	() => revivalProgress() >= 50,
	() => revivalProgress() >= 100,
	() => false,
]

// message handling
function messages() {
	console.log("checking")
	setTimeout(messages, (Math.random() + 0.2) * 1e5)
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
	if (devsMatchingStack.length === 0) devsMatchingStack = remainingDevs

	const dev =
		devsMatchingStack[Math.floor(Math.random() * devsMatchingStack.length)]

	// if (messages.length === 0 && revivalProgress() > 5) {
	cdata.messages.push(message(dev))
	cdata.unreadMessages++
	data.set(cdata)
	// }
}

setTimeout(messages, (Math.random() + 0.2) * 1e5)
