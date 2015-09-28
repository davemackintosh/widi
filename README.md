# Widi

This is just a simple lib for now, it doesn't do much but it does make it a bit easier.  

Web Midi, a *tiny* library __horribly__ bloated by all the shims needed for ES6 browser support. Yay JS...  

Makes connecting MIDI devices to web behaviour easy, see the [examples](examples/) folder.  

## Quickstart

```js
var Widi = new (require("Widi"))()

Widi.on("deviceChange", function(device) {
  console.log("A device has bee unplugged or plugged in!", device)
})

Widi.on("midiMessage", function(midiMessageData) {
  console.log("Received a message from MIDI device '%s'", this.NAME)
  console.log(midiMessageData)
})
```

## Developing

Run `make watch` to "build" every second if anything has updated.  

`make watch` to run a build every second if it changed.  
`make build` to just build the code using babelify.  
`make compress` to compress the output of `make build`.

# License
The MIT License (MIT)  

Copyright (c) 2015 Dave Mackintosh
