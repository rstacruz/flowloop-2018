/*::
  import type { State } from '../selectors/state'

  type Props = {
    onBack: () => void
  }
*/

import React from 'react'
import { connect } from 'react-redux'

/**
 * The settings page
 */

export class SettingsIndex extends React.Component {
  /*:: props: Props */
  render () {
    const { onBack } = this.props

    return <div className='_page-bottom settings-layout'>
      <div className='blank-state'>
        <h2>Settings</h2>
        <p>Thanks for trying out Flowloop!</p>
      </div>
      <button onClick={(e) => { e.preventDefault(); onBack() }}>Go back</button>
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
