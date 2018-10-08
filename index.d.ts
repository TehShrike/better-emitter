type Listener<EventArgument> = (...args: EventArgument[]) => void
type Unlisten = () => void

export interface Emitter<EventName extends string, EventArgument> {
	on(event: EventName, listener: Listener<EventArgument>): Unlisten,
	once(event: EventName, listener: Listener<EventArgument>): Unlisten,
	emit(event: EventName, ...args: EventArgument[]): void,
	removeAllListeners(): void,
}

declare function createEmitter<InputObject, EventName extends string, EventArgument>(inputObject: InputObject): Emitter<EventName, EventArgument> & InputObject
declare function createEmitter<EventName extends string, EventArgument>(): Emitter<EventName, EventArgument>

export default createEmitter