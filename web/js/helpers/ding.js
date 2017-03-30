import { Howl } from 'howler'

const sound = new Howl({
  src: [
    'assets/sounds/echoed-ding.ogg',
    'assets/sounds/echoed-ding.mp3'
  ]
})

/*
 * Play a sound
 */

export default function ding (count = 1) {
  sound.play()

  if (count > 1) {
    setTimeout(() => { ding(count - 1) }, 1000)
  }
}
