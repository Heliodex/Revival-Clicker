function createData() {
	let development = $state(0)

	return {
		get development() {
			return development
		},
		set development(v) {
			development = v
		},
	}
}

export const data = createData()
