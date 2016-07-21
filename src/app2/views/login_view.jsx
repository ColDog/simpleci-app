import React, {Component} from 'react'
import Store from '../store'
import Config from '../config'
import {observer} from 'mobx-react'

@observer
export default class AccountSettingsView extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div className="container-fluid">
      <div className="panel panel-default col-sm-5 col-sm-offset-4">
        <div className="panel-body text-center">
          <h5>Login</h5>

          <button className="btn btn-default"><a href={Config.config.api + '/auth/github'}>Github</a></button>
          <button className="btn btn-default"><a href={Config.config.api + '/auth/bitbucket'}>Bitbucket</a></button>
        </div>
      </div>
    </div>
  }
}
