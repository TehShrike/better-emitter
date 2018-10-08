import createEmitter, { Emitter } from './'

interface CoolThing {
	degrees: number
}

type AmazingEvent = 'shock' | 'awe' | 'wonder' | 'amazement'
type AmazingArgument = string | number
type AmazingThing = CoolThing & Emitter<AmazingEvent, AmazingArgument>

const coolThing : CoolThing = {
	degrees: 60
}

const ordinaryThing : Emitter<'foo' | 'baz', string> = createEmitter()

const amazingThing : AmazingThing = createEmitter(coolThing)

const stringTakingFunction = (...strings: string[]) => {}

ordinaryThing.emit('foo', 'football')
ordinaryThing.emit('baz', 'bazketball', 'bazillion')
ordinaryThing.on('foo', () => {})
ordinaryThing.on('baz', () => {})
ordinaryThing.on('foo', stringTakingFunction)
ordinaryThing.on('baz', stringTakingFunction)
ordinaryThing.removeAllListeners()

amazingThing.on('wonder', stringTakingFunction)
amazingThing.removeAllListeners()