type Listener = (...args) => void
type Unlisten = () => void

export interface Emitter {
	on(event: string, listener: Listener): Unlisten,
	once(event: string, listener: Listener): Unlisten,
	emit(event: string, ...args: any[]): void,
	removeAllListeners(): void,
}

declare function makeEmitter<Object>(object?: Object): Emitter & Object

export default makeEmitter
