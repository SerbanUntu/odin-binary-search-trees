import { Tree } from './tree.mjs'

const test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 10, 324])
test.insert(65)
console.log(test.delete(4)) // true
test.print()
/*
│           ┌── 6345
│       ┌── 324
│       │   └── 67
│       │       └── 65
│   ┌── 23
│   │   │   ┌── 10
│   │   └── 9
└── 8
    │   ┌── 7
    └── 5
        │   ┌── 3
        └── 1
*/
console.log(test.find(5)) // Node { data: 5, left: [Node], right: [Node] }
console.log(test.find(111)) // null

console.log(test.levelOrder()) // [ 8, 5, 23, 1, 7, 9, 324, 3, 10, 67, 6345, 65 ]
console.log(test.inOrder()) // [ 1, 3, 5, 7, 8, 9, 10, 23, 65, 67, 324, 6345 ]
console.log(test.preOrder()) // [ 8, 5, 1, 3, 7, 23, 9, 10, 324, 67, 65, 6345 ]
console.log(test.postOrder()) // [ 3, 1, 7, 5, 10, 9, 65, 67, 6345, 324, 23, 8 ]
