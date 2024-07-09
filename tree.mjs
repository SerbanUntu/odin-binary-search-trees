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
}
