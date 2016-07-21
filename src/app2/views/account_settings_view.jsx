import React, {Component} from 'react'
import Store from '../store'
import {observer} from 'mobx-react'

@observer
export default class AccountSecretsView extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div className="container-fluid">
      <h1>Acct Secrets</h1>
    </div>
  }
}
