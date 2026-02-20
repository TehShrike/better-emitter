import keyMaster from 'key-master'

const freshMap = () => keyMaster(() => new Map())

export default function createEmitter(emitter = Object.create(null)) {
	let eventsToListeners = freshMap()
	let nextId = 0

	emitter.on = (event, listener) => {
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
		const unsubscribe = emitter.on(event, (...args) => {
			listener(...args)
			unsubscribe()
		})

		return unsubscribe
	}

	emitter.emit = (event, arg) => {
		const listeners = eventsToListeners.get(event)
		let stoppedPropagation = false
		const stopPropagation = () => stoppedPropagation = true
		for (const listener of listeners.values()) {
			if (!stoppedPropagation) {
				listener(arg, { stopPropagation })
			}
		}
	}

	emitter.removeAllListeners = () => {
		eventsToListeners = freshMap()
	}

	return emitter
}
