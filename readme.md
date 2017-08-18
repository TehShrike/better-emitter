A very simple event emitter with a better API than all the others.

I don't like most event emitters because:

1. If you want to unsubscribe, you have to hold on to your listener function so you can call `emitter.unsubscribe(event, listener)`.  `emitter.on` should just return an unsubscribe function.
2. They use `this`, which means you can't pass around `on` or `emit` functions.
3. They always return new objects, when I often want to make an existing object an emitter.

This library is better!  Also, pretty simple.  Check out the source code.

```sh
npm i better-emitter
```

```
const createEmitter = require('better-emitter')
```

# API

<!--js
const createEmitter = require('./')
-->

```js
const emitter = createEmitter()

const unsubscribe = emitter.on('thing happened', (really, why) => {
	really // => true
	why // => 'I dunno'
})

emitter.emit('thing happened', true, 'I dunno')

unsubscribe()
```

## `emitter = createEmitter([emitter])`

This is the function exported by the module.  It creates a new event emitter object.  You can also pass in any object you want, and event emitter functions will be added to it.

## `unsubscribe = emitter.on(eventString, listenerFunction)`

Adds an event listener function.  Returns an unsubscribe function that, when called, prevents the listener from firing any more.

## `unsubscribe = emitter.once(eventString, listenerFunction)`

Just like the `on` function, except the listener is automatically unsubscribed after the first time the event is emitted.

## `emitter.emit(eventString, [...args])`

Calls all listeners of the given event string, with any arguments.

# License

[WTFPL](http://wtfpl2.com/)
