import { Howl } from 'howler'

/*
 * Play a sound
 */

export default function ding (count = 1) {
  /* eslint-disable no-new */
  new Howl({
    src: [
      'sounds/echoed-ding.ogg',
      'sounds/echoed-ding.mp3'
    ],
    volume: 0.5,
    autoplay: true
  })

  if (count > 1) {
    setTimeout(() => { ding(count - 1) }, 1000)
  }
}
