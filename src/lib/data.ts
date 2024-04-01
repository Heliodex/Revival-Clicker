import { get, writable } from "svelte/store"
import upg from "./components/upgrades.json"

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

console.log(upgrades)

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
	get(data).revivalUpgrades.length / upgrades.length * 100
