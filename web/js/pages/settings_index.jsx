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

    return <div className='_page-left settings-layout'>
      <Title title='Settings' />
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
        <div className='blank-state'>
          <h2>Settings</h2>
          <p>Thanks for trying out Flowloop!</p>
        </div>

        <br />

        <button onClick={(e) => { e.preventDefault(); onBack() }}>Go back</button>
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
