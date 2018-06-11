type Listener = (...args) => void
type Unlisten = () => void

interface Emitter {
	on(event: string, listener: Listener): Unlisten,
	once(event: string, listener: Listener): Unlisten,
	emit(event: string, ...args): void
}

declare function makeEmitter<Object>(object?: Object): Emitter & Object

export = makeEmitter
