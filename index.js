const keyMaster = require(`key-master`)

const assertType = (name, value, expectedType) => {
	const actualType = typeof value
	if (actualType !== expectedType) {
		throw new Error(`Expected ${ name } to be ${ expectedType } but it was ${ actualType }`)
	}
}

const freshMap = () => keyMaster(() => new Map())

module.exports = function createEmitter(emitter = Object.create(null)) {
	let eventsToListeners = freshMap()
	let nextId = 0

	emitter.on = (event, listener) => {
		assertType(`event`, event, `string`)
		assertType(`listener`, listener, `function`)

		const id = (nextId++).toString()
		const listeners = eventsToListeners.get(event)
		listeners.set(id, listener)

		return () => {
			listeners.delete(id)

			if (listeners.size === 0) {
				eventsToListeners.delete(event)
			}
		}
	}

	emitter.once = (event, listener) => {
		assertType(`event`, event, `string`)
		assertType(`listener`, listener, `function`)

		const unsubscribe = emitter.on(event, (...args) => {
			listener(...args)
			unsubscribe()
		})

		return unsubscribe
	}

	emitter.emit = (event, ...args) => {
		assertType(`event`, event, `string`)

		const listeners = eventsToListeners.get(event)
		for (const listener of listeners.values()) {
			listener(...args)
		}
	}

	emitter.removeAllListeners = () => {
		eventsToListeners = freshMap()
	}

	return emitter
}
