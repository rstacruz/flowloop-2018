/*::
  import type { State } from '../selectors/state'

  type Props = {
    onBack: () => void
  }
*/

import React from 'react'
import { connect } from 'react-redux'
import Title from 'react-document-title'

/**
 * The settings page
 */

export class SettingsIndex extends React.PureComponent {
  /*:: props: Props */
  render () {
    const { onBack } = this.props
    const version = process.env.VERSION

    return <div className='_page-left settings-layout'>
      <Title title='Settings' />

      <div className='topleft'>
        <a
          className='back-button -white' href='#'
          onClick={(e) => { e.preventDefault(); onBack() }}>
          <span className='icon' />
        </a>
      </div>

      <div className='title'>
        <div className='settings-heading'>
          <h1>Flowloop</h1>

          <a className='push-button -white'
            href='https://github.com/rstacruz/flowloop#about'
            target='_blank'>
            Learn more
          </a>
        </div>
      </div>

      <div className='body'>
        <div className='settings-items'>
          <div className='settings-item'>
            <h2>Timer duration</h2>
          </div>

          <div className='settings-item'>
            <h3>Work timer</h3>
            <p>25 minutes</p>
          </div>

          <div className='settings-item'>
            <h3>Break timer</h3>
            <p>5 minutes</p>
          </div>

          <div className='settings-item'>
            <h2>About</h2>
          </div>

          <div className='settings-item'>
            <h3>Flowloop</h3>
            { version ? <p>{version}</p> : null }
          </div>

          <div className='settings-item'>
            <p>
              <a href='https://github.com/rstacruz/flowloop' target='_blank'>
                <img src='https://img.shields.io/github/stars/rstacruz/flowloop.svg?style=social&label=Star' />
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  }
}

/*
 * Redux
 */

export default connect(
  (state /*: State */) => ({}),
  (dispatch) => ({
    onBack: () => {
      dispatch({ type: 'router:nav!', to: '/', back: true })
    }
  })
)(SettingsIndex)
