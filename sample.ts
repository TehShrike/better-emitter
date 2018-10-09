import createEmitter from './'

const emitter = createEmitter<{ 'foo': string, 'bar': number }>()

emitter.on('foo', (v: string) => v)
emitter.emit('foo', 'football')

emitter.on('bar', (v: number) => v)
emitter.emit('bar', 123)