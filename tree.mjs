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

	deleteItem(value) {
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

	levelOrder(callback) {
		const q = []
		const arr = []
		let index = 0
		q.push(this.root)
		while (q.length >= index + 1) {
			let currentNode = q[index]
			index++
			if (callback) callback(currentNode)
			else arr.push(currentNode.data)
			if (currentNode.left !== null) q.push(currentNode.left)
			if (currentNode.right !== null) q.push(currentNode.right)
		}
		if (!callback) return arr
	}

	inOrder(callback, node = this.root, arr = []) {
		if (node.left !== null) this.inOrder(callback, node.left, arr)
		if (callback) callback(node)
		else arr.push(node.data)
		if (node.right !== null) this.inOrder(callback, node.right, arr)
		if (!callback) return arr
	}

	preOrder(callback, node = this.root, arr = []) {
		if (callback) callback(node)
		else arr.push(node.data)
		if (node.left !== null) this.preOrder(callback, node.left, arr)
		if (node.right !== null) this.preOrder(callback, node.right, arr)
		if (!callback) return arr
	}

	postOrder(callback, node = this.root, arr = []) {
		if (node.left !== null) this.postOrder(callback, node.left, arr)
		if (node.right !== null) this.postOrder(callback, node.right, arr)
		if (callback) callback(node)
		else arr.push(node.data)
		if (!callback) return arr
	}

	height(node) {
		if (node.left === null && node.right === null) return 0
		if (node.left === null) return this.height(node.right) + 1
		if (node.right === null) return this.height(node.left) + 1
		return Math.max(this.height(node.left), this.height(node.right)) + 1
	}

	depth(node) {
		let currentNode = this.root
		let result = 0
		while (currentNode !== null) {
			if (currentNode.data === node.data) return result
			if (currentNode.data > node.data) {
				currentNode = currentNode.left
				result++
			}
			if (currentNode.data < node.data) {
				currentNode = currentNode.right
				result++
			}
		}
		return null
	}

	isBalanced(node = this.root) {
		if (node === null) return true
		let leftHeight = -1
		let rightHeight = -1
		if (node.left) leftHeight = this.height(node.left)
		if (node.right) rightHeight = this.height(node.right)
		if (Math.abs(leftHeight - rightHeight) > 1) return false
		return this.isBalanced(node.left) && this.isBalanced(node.right)
	}

	rebalance() {
		this.root = buildTree(this.inOrder())
	}
}
