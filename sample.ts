import createEmitter from './'

const stringTakingFunction = (...strings: string[]) => {}

const backwardCompatibleEmitter = createEmitter()
backwardCompatibleEmitter.on('whatever', () => {})
backwardCompatibleEmitter.emit('whatever')

const anyEmitter = createEmitter<any, any>()
anyEmitter.on('whatever', stringTakingFunction)
anyEmitter.emit('whatever', 123)

const ordinaryEmitter = createEmitter<'foo' | 'baz', string>()
ordinaryEmitter.on('foo', () => {})
ordinaryEmitter.on('baz', () => {})
ordinaryEmitter.on('foo', stringTakingFunction)
ordinaryEmitter.on('baz', stringTakingFunction)
ordinaryEmitter.emit('foo', 'football')
ordinaryEmitter.emit('baz', 'bazketball', 'bazillion')
ordinaryEmitter.removeAllListeners()

interface CoolObject {
	degrees: number
}

type AmazingEvent = 'shock' | 'awe' | 'wonder' | 'amazement'
type AmazingArgument = string | number

const amazingEmitter = createEmitter <CoolObject, AmazingEvent, AmazingArgument> ({ degrees: 60 })
amazingEmitter.on('wonder', stringTakingFunction)
amazingEmitter.emit('wonder', 'ful')
amazingEmitter.removeAllListeners()