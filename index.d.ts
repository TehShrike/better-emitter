type Listener<EventArgument> = (...args: EventArgument[]) => void
type Unlisten = () => void

export interface Emitter<EventName extends string, EventArgument> {
	on(event: EventName, listener: Listener<EventArgument>): Unlisten,
	once(event: EventName, listener: Listener<EventArgument>): Unlisten,
	emit(event: EventName, ...args: EventArgument[]): void,
	removeAllListeners(): void,
}

declare function makeEmitter<Object, EventName extends string, EventArgument>(object?: Object): Emitter<EventName, EventArgument> & Object

export default makeEmitter