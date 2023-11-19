import { writable } from "svelte/store"

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
	},
	revivalUpgrades: [] as string[],
})
