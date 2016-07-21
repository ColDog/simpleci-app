import React, {Component} from 'react'
import Store from '../store'
import {observer} from 'mobx-react'

@observer
export default class AccountSettingsView extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div className="container-fluid">
      <div className="col-sm-3">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">Account</h4>
          </div>
          <div className="list-group">
            <a className="list-group-item" href={"/accounts/" + this.props.account + "/jobs"}>Jobs</a>
            <a className="list-group-item active" href={"/accounts/" + this.props.account + "/settings"}>Settings</a>
            <a className="list-group-item">Subscription</a>
          </div>
        </div>
      </div>

      <div className="col-sm-9">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">Secrets</h4>
          </div>
          <div className="list-group">
            {(() => {
              return this.props.secrets.map((secret) => {
                return <a className="list-group-item">
                    {secret.key}: {secret.value}
                </a>
              })
            })()}
          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">Tokens</h4>
          </div>
          <div className="list-group">
            {(() => {
              return this.props.tokens.map((token) => {
                return <a className="list-group-item">
                    {token.key}
                </a>
              })
            })()}
          </div>
        </div>
      </div>
    </div>
  }
}
