/* @flow */

import React from 'react'
import c from 'classnames'

type Props = {
  className?: string,
  progress: number,
  steps: number,
  color?: string
}

/**
 * A pie graph. Yum! Actually it's an arc, but whatever.
 */

export default function PieGraph (props: Props) {
  const { progress, className, steps, color } = props
  const moreThanHalf = progress > 0.5
  const interval = 360 / Math.round(steps)
  const deg = moreThanHalf ? 360 * (progress - 0.5) : 360 * progress
  const actualDeg = quantize(deg, interval)

  return (
    <div className={c('pie-graph', className)}>
      <span className='fill' style={{ background: color }} />
      <span
        key={moreThanHalf ? 'fill' : 'cover'}
        className={pieceClass(moreThanHalf)}
        style={{
          transform: `rotate(${actualDeg}deg)`,
          background: moreThanHalf ? color : undefined
        }}
      />
      <span className='center' />
    </div>
  )
}

/**
 * Ensures very round numbers based on an interval.
 */

function quantize (number: number, interval: number) {
  return Math.round(number / interval) * interval
}

/**
 * Class name for piece
 */

function pieceClass (moreThanHalf: boolean) {
  return c('piece', {
    '-fill': moreThanHalf,
    '-cover': !moreThanHalf
  })
}
