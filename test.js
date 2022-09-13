const test = require(`tape`)
const createEmitter = require(`./`)

test(`Events work (in order)`, t => {
	const emitter = createEmitter()

	let firstFired = false

	emitter.on(`Shouldn't happen`, () => t.fail())
	emitter.on(`wat`, a => {
		t.equal(a, `arg1`)
		firstFired = true
	})
	emitter.on(`wat`, a => {
		t.equal(a, `arg1`)
		t.ok(firstFired)
		t.end()
	})

	emitter.emit(`wat`, `arg1`)
})

test(`Events fire synchronously`, t => {
	const emitter = createEmitter()

	let firstFired = false
	let secondFired = false
	emitter.on(`thingy`, () => firstFired = true)
	emitter.on(`thingy`, () => secondFired = true)

	emitter.emit(`thingy`)

	t.ok(firstFired)
	t.ok(secondFired)
	t.end()
})

test(`Unsubscribe works`, t => {
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

	t.equal(firstFiredTimes, 1)
	t.equal(secondFiredTimes, 3)

	t.end()
})

test(`once`, t => {
	const emitter = createEmitter()

	let firedTimes = 0
	emitter.once(`whatever`, () => {
		firedTimes++
	})

	emitter.emit(`whatever`)
	emitter.emit(`whatever`)

	t.equal(firedTimes, 1)
	t.end()
})

test(`once's unsubscribe function`, t => {
	const emitter = createEmitter()

	let firedTimes = 0
	const unsubscribe = emitter.once(`whatever`, () => {
		firedTimes++
	})

	unsubscribe()

	emitter.emit(`whatever`)
	emitter.emit(`whatever`)

	t.equal(firedTimes, 0)
	t.end()
})

test(`Events work when you pass in your own object`, t => {
	const inputObject = () => {}
	const emitter = createEmitter(inputObject)

	t.equal(emitter, inputObject)

	let firstFired = false
	emitter.on(`wat`, () => {
		firstFired = true
	})

	emitter.emit(`wat`)
	t.equal(firstFired, true)

	t.end()
})

test(`removeAllListeners`, t => {
	const emitter = createEmitter()

	emitter.on(`wat`, () => {
		t.fail(`wat events should not be called`)
	})

	emitter.on(`ok`, () => {
		t.fail(`ok events should not be called`)
	})

	emitter.removeAllListeners()

	emitter.emit(`wat`)
	emitter.emit(`ok`)

	t.end()
})

test(`stopPropagation`, t => {
	const emitter = createEmitter()

	emitter.on(`wat`, (_, { stopPropagation }) => {
		stopPropagation()
	})

	emitter.on(`wat`, () => {
		t.fail(`Should not be called because the first listener called stopPropagation`)
	})

	emitter.emit(`wat`)

	t.end()
})
