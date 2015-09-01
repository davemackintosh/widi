class Note {
  Note = 0
  Type = 0xf0
  Velocity = 0
  Start = 0
  End = 0

  constructor(AudioInterface) {
    // TBD
  }

  NewFromRaw(raw) {
    // Get the type of command and fix it's bits.
    this.Type = raw[0] & 0xf0

    // Get the frequency of the note we want to play
    this.Note = 440 * Math.pow(2, (raw[1] - 69) / 12)

    // Get the velocity this note is to be played at.
    this.Velocity = raw[2]
  }
}

export default Note
