// 2. Add Two Numbers https://leetcode.com/problems/add-two-numbers/

// You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

// You may assume the two numbers do not contain any leading zero, except the number 0 itself.

 

// Example 1:
// 2 -> 4 -> 3
// 5 -> 6 -> 4
// -----------
// 7 -> 0 -> 8

// Input: l1 = [2,4,3], l2 = [5,6,4]
// Output: [7,0,8]
// Explanation: 342 + 465 = 807.
// Example 2:

// Input: l1 = [0], l2 = [0]
// Output: [0]
// Example 3:

// Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
// Output: [8,9,9,9,0,0,0,1]
 

// Constraints:

// The number of nodes in each linked list is in the range [1, 100].
// 0 <= Node.val <= 9
// It is guaranteed that the list represents a number that does not have leading zeros.

class LinkedListNode {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

function fromArray(arr) {
  let head = new LinkedListNode(arr[0]);
  let runner = head;

  for (let i=1; i<arr.length; i++) {
    runner.next = new LinkedListNode(arr[i])
    runner = runner.next
  }

  return head
}

function toArrayString(list) {
  let arr = []
  let runner = list
  while (runner != null) {
    arr.push(runner.value)
    runner = runner.next
  }

  return arr.join('')
}


/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const addTwoNumbers = function(l1, l2) {
  let [runner1, runner2] = [l1, l2];
  let resultHead = new LinkedListNode();
  let result = resultHead;
  let carry = 0;

  while (runner1 != null || runner2 != null) {
    let left = 0
    if (runner1 != null) { left = runner1.value; runner1 = runner1.next }

    let right = 0
    if (runner2 != null) { right = runner2.value; runner2 = runner2.next }
 
    let next = left + right + carry

    if (next > 9) {
      carry = 1;
      next = next % 10
    } else {
      carry = 0
    }

    result.next = new LinkedListNode(next)
    result = result.next
  }

  if (carry !== 0) {
    result.next = new LinkedListNode(carry)
  }

  return resultHead.next
};

const testCases = [
  {
    lists: [
      fromArray([2, 4, 3]),
      fromArray([5, 6, 4])
    ],
    expected: fromArray([7, 0, 8])
  },
  {
    lists: [ fromArray([0]), fromArray([0]) ],
    expected: fromArray([0])
  },
  {
    lists: [ fromArray([9,9,9,9,9,9,9]), fromArray([9,9,9,9]) ],
    expected: fromArray([8,9,9,9,0,0,0,1])
  }
]

testCases.forEach(test => {
  const result = addTwoNumbers.apply(null, test.lists)
  console.log(toArrayString(test.expected), toArrayString(result))
})