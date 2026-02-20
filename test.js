import test from 'node:test'
import assert from 'node:assert'
import createEmitter from './index.js'

test(`Events work (in order)`, () => {
	const emitter = createEmitter()

	let firstFired = false

	emitter.on(`Shouldn't happen`, () => assert.fail())
	emitter.on(`wat`, a => {
		assert.strictEqual(a, `arg1`)
		firstFired = true
	})
	emitter.on(`wat`, a => {
		assert.strictEqual(a, `arg1`)
		assert.ok(firstFired)
	})

	emitter.emit(`wat`, `arg1`)
})

test(`Events fire synchronously`, () => {
	const emitter = createEmitter()

	let firstFired = false
	let secondFired = false
	emitter.on(`thingy`, () => firstFired = true)
	emitter.on(`thingy`, () => secondFired = true)

	emitter.emit(`thingy`)

	assert.ok(firstFired)
	assert.ok(secondFired)
})

test(`Unsubscribe works`, () => {
	const emitter = createEmitter()

	let firstFiredTimes = 0
	let secondFiredTimes = 0

	const unsubscribe = emitter.on(`hmm`, () => {
		firstFiredTimes++
		unsubscribe()
	})

	emitter.on(`hmm`, () => {
		secondFiredTimes++
	})

	emitter.emit(`hmm`)
	emitter.emit(`hmm`)
	emitter.emit(`hmm`)

	assert.strictEqual(firstFiredTimes, 1)
	assert.strictEqual(secondFiredTimes, 3)
})

test(`once`, () => {
	const emitter = createEmitter()

	let firedTimes = 0
	emitter.once(`whatever`, () => {
		firedTimes++
	})

	emitter.emit(`whatever`)
	emitter.emit(`whatever`)

	assert.strictEqual(firedTimes, 1)
})

test(`once's unsubscribe function`, () => {
	const emitter = createEmitter()

	let firedTimes = 0
	const unsubscribe = emitter.once(`whatever`, () => {
		firedTimes++
	})

	unsubscribe()

	emitter.emit(`whatever`)
	emitter.emit(`whatever`)

	assert.strictEqual(firedTimes, 0)
})

test(`Events work when you pass in your own object`, () => {
	const inputObject = () => {}
	const emitter = createEmitter(inputObject)

	assert.strictEqual(emitter, inputObject)

	let firstFired = false
	emitter.on(`wat`, () => {
		firstFired = true
	})

	emitter.emit(`wat`)
	assert.strictEqual(firstFired, true)
})

test(`removeAllListeners`, () => {
	const emitter = createEmitter()

	emitter.on(`wat`, () => {
		assert.fail(`wat events should not be called`)
	})

	emitter.on(`ok`, () => {
		assert.fail(`ok events should not be called`)
	})

	emitter.removeAllListeners()

	emitter.emit(`wat`)
	emitter.emit(`ok`)
})

test(`stopPropagation`, () => {
	const emitter = createEmitter()

	emitter.on(`wat`, (_, { stopPropagation }) => {
		stopPropagation()
	})

	emitter.on(`wat`, () => {
		assert.fail(`Should not be called because the first listener called stopPropagation`)
	})

	emitter.emit(`wat`)
})
