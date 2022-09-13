A very simple event emitter with a better API than all the others.

It's better because:

1. `on` and `once` return an unsubscribe function
2. It doesn't use `this`, which means you can pass around the `on` or `emit` functions
3. It can take in any existing object and turn it into an emitter

Also, it's pretty simple.  Check out the source code.

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

const unsubscribe = emitter.on('thing happened', (really) => {
	really // => true
})

emitter.emit('thing happened', true)

unsubscribe()
```

## `emitter = createEmitter([emitter])`

This is the function exported by the module.  It creates a new event emitter object.  You can also pass in any object you want, and event emitter functions will be added to it.

## `unsubscribe = emitter.on(eventString, listenerFunction)`

Adds an event listener function.  Returns an unsubscribe function that, when called, prevents the listener from firing any more.

## `unsubscribe = emitter.once(eventString, listenerFunction)`

Just like the `on` function, except the listener is automatically unsubscribed after the first time the event is emitted.

## `emitter.emit(eventString, [arg])`

Calls all listeners of the given event string, with one optional argument.

## `emitter.removeAllListeners()`

Unsubscribes all current event listeners.

# License

[WTFPL](http://wtfpl2.com/)
