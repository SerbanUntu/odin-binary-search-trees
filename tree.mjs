function processArray(arr) {
	arr.sort((a, b) => a - b)
	const newArr = []
	for (let el of arr) {
		let last = newArr[newArr.length - 1]
		if (last !== el) newArr.push(el)
	}
	return newArr
}

function buildTree(arr, left = 0, right = arr.length - 1) {
	if (left > right || arr.length === 0) return null
	const mid = Math.floor((left + right) / 2)
	const root = new Node(arr[mid])
	root.left = buildTree(arr, left, mid - 1)
	root.right = buildTree(arr, mid + 1, right)
	return root
}

function prettyPrint(node, prefix = '', isLeft = true) {
	if (node === null) {
		return
	}
	if (node.right !== null) {
		prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false)
	}
	console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`)
	if (node.left !== null) {
		prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true)
	}
}

class Node {
	data
	left
	right

	constructor(data, left = null, right = null) {
		this.data = data
		this.left = left
		this.right = right
	}
}

export class Tree {
	root

	constructor(arr) {
		this.root = buildTree(processArray(arr))
	}

	print() {
		prettyPrint(this.root)
	}

	insert(value) {
		const newNode = new Node(value)
		let currentNode = this.root
		if (currentNode === null) {
			this.root = newNode
			return
		}
		while (true) {
			if (newNode.data < currentNode.data) {
				if (currentNode.left === null) {
					currentNode.left = newNode
					return
				}
				currentNode = currentNode.left
			} else if (newNode.data > currentNode.data) {
				if (currentNode.right === null) {
					currentNode.right = newNode
					return
				}
				currentNode = currentNode.right
			} else return
		}
	}

	delete(value) {
		let currentNode = this.root
		let parentNode = currentNode
		let pathTaken = 'left'
		while (currentNode !== null) {
			if (currentNode.data === value) {
				if (currentNode.left && currentNode.right) {
					// Two children
					let lastReplacement = currentNode
					let replacementPathTaken = 'right'
					let replacement = currentNode.right
					while (replacement.left) {
						lastReplacement = replacement
						replacementPathTaken = 'left'
						replacement = replacement.left
					}
					currentNode.data = replacement.data
					if (replacement.right) {
						lastReplacement[replacementPathTaken] = replacement.right
					} else {
						lastReplacement[replacementPathTaken] = null
					}
				} else if (currentNode.left) {
					// Left child
					if (currentNode.data === this.root.data) {
						this.root = this.root.left
						return true
					}
					parentNode[pathTaken] = currentNode.left
				} else if (currentNode.right) {
					// Right child
					if (currentNode.data === this.root.data) {
						this.root = this.root.right
						return true
					}
					parentNode[pathTaken] = currentNode.right
				} else {
					// No children
					if (currentNode.data === this.root.data) {
						this.root = null
						return true
					}
					parentNode[pathTaken] = null
				}
				return true
			}
			parentNode = currentNode
			if (currentNode.data > value) {
				pathTaken = 'left'
				currentNode = currentNode.left
			}
			if (currentNode.data < value) {
				pathTaken = 'right'
				currentNode = currentNode.right
			}
		}
		return false
	}

	find(value) {
		let currentNode = this.root
		while (currentNode !== null) {
			if (currentNode.data === value) return currentNode
			if (currentNode.data > value) currentNode = currentNode.left
			if (currentNode.data < value) currentNode = currentNode.right
		}
		return currentNode
	}
}
