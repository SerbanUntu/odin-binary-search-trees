export function getRandomNumber(range) {
	return Math.ceil(Math.random() * range)
}

export function getRandomArray(length, range) {
	const arr = []
	for (let i = 0; i < length; i++) {
		arr.push(getRandomNumber(range))
	}
	return arr
}
