const keyMaster = require('key-master')

const getPropertyValuesInOrder = o => Object.getOwnPropertyNames(o).map(key => o[key])
const assertType = (name, value, expectedType) => {
	const actualType = typeof value
	if (actualType !== expectedType) {
		throw new Error(`Expected ${name} to be ${expectedType} but it was ${actualType}`)
	}
}

module.exports = function createEmitter(emitter = Object.create(null)) {
	const eventsToListeners = keyMaster(() => Object.create(null))

	emitter.on = (event, listener) => {
		assertType('event', event, 'string')
		assertType('listener', listener, 'function')

		const id = Math.random().toString()
		const listeners = eventsToListeners.get(event)
		listeners[id] = listener

		return () => {
			delete listeners[id]
		}
	}

	emitter.once = (event, listener) => {
		assertType('event', event, 'string')
		assertType('listener', listener, 'function')

		const unsubscribe = emitter.on(event, (...args) => {
			listener(...args)
			unsubscribe()
		})

		return unsubscribe
	}

	emitter.emit = (event, ...args) => {
		assertType('event', event, 'string')

		const listeners = eventsToListeners.get(event)
		getPropertyValuesInOrder(listeners).forEach(listener => listener(...args))
	}

	return emitter
}
