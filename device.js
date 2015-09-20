class MIDIDevice {

  // Device meta-data.
  ID = ""
  NAME = "Midi Device"
  MANUFACTURER = "Generic"

  // A above middle C, "standard tuning".
  TUNING = 440

  // By default, the device is connected.
  CONNECTED = true

  // Where the main bus that created this
  // interface is so we can fire events.
  BUS_TARGET = null

  constructor(device, busDevice) {
    // Set the bus device.
    this.BUS_TARGET = busDevice

    // Set the meta-data.
    this.ID = device.id
    this.NAME = device.name
    this.MANUFACTURER = device.manufacturer

    // Listen to messages and state changes on the device.
    device.onmidimessage = this.reactToMidiMessage.bind(this)
    device.onstatechange = this.reactToDeviceStageChanging.bind(this)
  }

  reactToDeviceStageChanging(midiConnectionEvent) {
    // Change the connected status of the device.
    this.CONNECTED = midiConnectionEvent.currentTarget.state !== "disconnected"

    if (this.BUS_TARGET) {
      this.BUS_TARGET.events.deviceChange
        .forEach(callback => callback.call(this, this))
    }
    else {
      console.warn(`Midi message received for "${this.NAME}" but no bus to send message to.`)
    }

    return this
  }

  reactToMidiMessage(midiMessage) {
    // Get the data from the message.
    let [command, note, velocity] = midiMessage.data

    // Fix and normalise the data received from the device.
    command = command & 0xf0
    note = this.TUNING * Math.pow(2, (note - 69) / 12)
    velocity = velocity / 127

    if (this.BUS_TARGET) {
      this.BUS_TARGET.events.midiMessage
        .forEach(callback => callback.call(this, { command, note, velocity }))
    }
    else {
      console.warn(`Midi message received for "${this.NAME}" but no bus to send message to.`)
    }

    return this
  }
}

export default MIDIDevice
