type Unlisten = () => void
type Listener<EventArgument> = (...args: EventArgument[]) => void

interface Listen<EventMap> {
	<EventName extends keyof EventMap>(eventName: EventName, listener: Listener<EventMap[EventName]>) : Unlisten,
}

interface Emit<EventMap> {
  <EventName extends keyof EventMap>(eventName: EventName, ...eventArgs: EventMap[EventName][]) : void
}

export interface Emitter<EventMap> {
	on: Listen<EventMap>,
	once: Listen<EventMap>,
	emit: Emit<EventMap>,
	removeAllListeners(): void
}

declare function createEmitter<EventMap>(): Emitter<EventMap>
declare function createEmitter<EventMap, InputObject>(inputObject): Emitter<EventMap> & InputObject

export default createEmitter