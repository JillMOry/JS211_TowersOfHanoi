"use strict";

const assert = require("assert");
const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

let stacks = {
	a: [4, 3, 2, 1],
	b: [],
	c: []
};

const printStacks = () => {
	console.log("a: " + stacks.a);
	console.log("b: " + stacks.b);
	console.log("c: " + stacks.c);
};

// keep each step as a separate function for 1. keep deugging easier, 2. slow down and get one block of code to work before going to the next step...just as JS will read the code.
// move piece = stacks[startStack].pop() takes the last disk from the array and stacks[endStack].push(disk) places it in the end array (where the player selected to place the disk)
const movePiece = (startStack, endStack) => {
	let disk = stacks[startStack].pop();
	stacks[endStack].push(disk);
};

// Before the disk is moved the value is evaluated against the last item of the array the player selects to place the disk. If the endstack is empty the move is legal.  If the endstack array is not empty test if the last value is greather than the startstack disk.
const isLegal = (startStack, endStack) => {
	if (
		stacks[endStack].length === 0 ||
		stacks[startStack].pop() < stacks[endStack].pop()
	) {
		return true;
	} else {
		return false;
	}
};

// stack.a (the stack where all the disks orgiginated) should be empty so only stack.b or stack.c need to be evaluated for a win.  checkForWin evaluates the length of the array.
const checkForWin = (startStack, endStack) => {
	if (stacks.b.length === 4 || stacks.c.length === 4) {
		return true;
	} else {
		return false;
	}
};

// 1. the disk taken from the start stack to be evaluated for a legal move.  If legal, move the piece, after the move test for a win.
const towersOfHanoi = (startStack, endStack) => {
	if (isLegal(startStack, endStack) === true);
	{
		movePiece(startStack, endStack);
	}
	{
		checkForWin(endStack);
	}
};

const getPrompt = () => {
	printStacks();
	rl.question("start stack: ", (startStack) => {
		rl.question("end stack: ", (endStack) => {
			towersOfHanoi(startStack, endStack);
			getPrompt();
		});
	});
};

// Tests

if (typeof describe === "function") {
	describe("#towersOfHanoi()", () => {
		it("should be able to move a block", () => {
			towersOfHanoi("a", "b");
			assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
		});
	});

	describe("#isLegal()", () => {
		it("should not allow an illegal move", () => {
			stacks = {
				a: [4, 3, 2],
				b: [1],
				c: []
			};
			assert.equal(isLegal("a", "b"), false);
		});
		it("should allow a legal move", () => {
			stacks = {
				a: [4, 3, 2, 1],
				b: [],
				c: []
			};
			assert.equal(isLegal("a", "c"), true);
		});
	});
	describe("#checkForWin()", () => {
		it("should detect a win", () => {
			stacks = { a: [], b: [4, 3, 2, 1], c: [] };
			assert.equal(checkForWin(), true);
			stacks = { a: [1], b: [4, 3, 2], c: [] };
			assert.equal(checkForWin(), false);
		});
	});
} else {
	getPrompt();
}
