class Widi {
  /**
   * Create a new instance of the Widi class.
   *
   * @return {Widi} an interface to play and receive MIDI notes.
   */
  constructor() {
    // All the midi interfaces will be stored here.
    this.inputs = []

    // Get the available midi devices.
    this.getMIDIAccess()
  }

  /**
   * Get the midi control interface and any
   * midi devices on the system.
   *
   * @return {[type]} [description]
   */
  @readonly
  async getMIDIAccess() {
    // Get the interface for doing midi things.
    this.midi_control = await navigator.requestMIDIAccess()

    // Get an array of the available inputs.
    this.inputs = [...this.midi_control.inputs.values()].map(this.NewMIDIDevice)

    // Exit.
    return this
  }

  @readonly
  static NewMIDIDevice() {

  }

  @readonly
  static NewAudioContext() {
    const Platform = window.AudioContext || window.webkitAudioContext

    return new Platform()
  }
}

class MIDIDevice {
  constructor() {

  }
}

export default Widi
