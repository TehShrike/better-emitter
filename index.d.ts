type EventMap = Record<string, any>
type Listener<T> = (arg: T, context: { stopPropagation: () => void }) => void
type Unlisten = () => void

export interface Emitter<Events extends EventMap = EventMap> {
	on<Key extends keyof Events>(event: Key, listener: Listener<Events[Key]>): Unlisten
	once<Key extends keyof Events>(event: Key, listener: Listener<Events[Key]>): Unlisten

	// Overload for events with undefined/void payload (no arg required)
	emit<Key extends keyof Events>(
		event: undefined extends Events[Key] ? Key : never
	): void

	// Overload for events with defined payload (arg required)
	emit<Key extends keyof Events>(event: Key, arg: Events[Key]): void

	removeAllListeners(): void
}

declare function makeEmitter<
	Events extends EventMap = EventMap,
	Object = Record<string, never>
>(object?: Object): Emitter<Events> & Object

export default makeEmitter
