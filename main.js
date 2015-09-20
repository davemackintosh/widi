/* eslint-disable */
// Ignore this line as Babel needs it but
// the syntax requires a definition.
import * as _ from "babel/polyfill"
/* eslint-enable */
import * as utils from "./utils"
import MIDIDevice from "./device"

/**
 * Widi, a web based midi lib that's small
 * and helpful. Just allows easy access to
 * the midi devices plugged into your computer.
 *
 * @version 0.0.1
 * @license MIT
 */
class Widi {
  // All the midi interfaces will be stored here.
  Inputs = []

  // Is this instance requesting system exclusivity of the devices?
  // this will almost certainly be false.
  @utils.nonenumerable
  SYSEX = false

  @utils.nonenumerable
  @utils.readonly
  events = Object.freeze({
    deviceChange: new Set(),
    midiMessage: new Set()
  })

  /**
   * Create a new instance of the Widi class.
   *
   * @return {Widi} an interface to play and receive MIDI notes.
   */
  constructor() {
    // Get the available midi devices.
    navigator.requestMIDIAccess({ sysex: this.SYSEX }).then(midiAccessInterface => {
      return this.getInputsAndInterfaceFromPromise(midiAccessInterface)
    })
  }

  /**
   * Get the midi control interface and any
   * midi devices on the system.
   *
   * @param {midiAccessInterface} midiAccessInterface : MIDIAccess to get devices and inputs from.
   * @return {Widi} chainable object.
   */
  getInputsAndInterfaceFromPromise(midiAccessInterface) {
    // Get an array of the available inputs.
    this.Inputs = [...midiAccessInterface.inputs.values()].map(this.NewMIDIDevice.bind(this))

    // Exit.
    return this
  }

  /**
   * A map-able function to create midi devices from the available inputs.
   * @param {MIDIInput} device to register.
   * @return {MIDIDevice} registered device.
   */
  NewMIDIDevice(device) {
    return new MIDIDevice(device, this)
  }

  /**
   * Attach listeners to devices.
   *
   * @param  {String} eventName to listen for.
   * @param  {Function} callback to execute on this event.
   * @return {Widi} chainable object.
   */
  on(eventName, callback) {
    this.events[eventName].add(callback)

    return this
  }
}

export default Widi
