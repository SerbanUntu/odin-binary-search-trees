import { Tree } from './tree.mjs'
import { getRandomArray } from './util.mjs'

const test = new Tree(getRandomArray(50, 10_000))
console.log(test.isBalanced()) // true
console.log(test.levelOrder())
console.log(test.preOrder())
console.log(test.postOrder())
console.log(test.inOrder())
getRandomArray(200, 10_000).forEach(value => {
	test.insert(value)
})
console.log(test.isBalanced()) // false
test.rebalance()
console.log(test.isBalanced()) // true
console.log(test.levelOrder())
console.log(test.preOrder())
console.log(test.postOrder())
console.log(test.inOrder())
