import MIDIDevice from "./device"
import Note from "./note"

/**
 * Widi, a web based midi lib that's small
 * and helpful. Just allows easy access to
 * the midi devices plugged into your computer.
 *
 * @version 0.0.1
 * @license MIT
 */
class Widi {
  MidiControl

  // All the midi interfaces will be stored here.
  Inputs

  /**
   * Create a new instance of the Widi class.
   *
   * @return {Widi} an interface to play and receive MIDI notes.
   */
  constructor() {
    // Get the available midi devices.
    this.getMIDIAccess()
  }

  /**
   * Get the midi control interface and any
   * midi devices on the system.
   *
   * @return {[type]} [description]
   */
  async GetMIDIAccess() {
    // Get the interface for doing midi things.
    this.MidiControl = await navigator.requestMIDIAccess()

    // Get an array of the available inputs.
    this.Inputs = [...this.MidiControl.inputs.values()].map(this.NewMIDIDevice)

    // Exit.
    return this
  }

  static NewMIDIDevice(device) {
    return new MIDIDevice(device)
  }

  static NewAudioContext() {
    // TBD
  }
}

export default Widi
