import React, {Component} from 'react'
import Store from '../store'
import {observer} from 'mobx-react'

@observer
export default class AccountSettingsView extends Component {
  state = {latest_token: null}

  constructor(props) {
    super(props)
  }

  handleAddKey(evt) {
    evt.preventDefault()
    Store.create('tokens').then((data) => {
      this.setState({latest_token: data.token})
    })
  }

  handleRemoveKey(id) {
    Store.destroy('tokens', id)
  }

  handleRemoveSecret(id) {
    Store.destroy('secrets', id)
  }

  handleAddSecret(evt) {
    evt.preventDefault()
    let form = $(evt.target).serializeObject()
    Store.create('secrets', {secret: form})
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
        {(() => {
          if (this.state.latest_token) {
            return <div className="panel panel-success">
              <div className="panel-heading">
                <span className="close" onClick={(() => { this.setState({latest_token: null}) }).bind(this)}>&times;</span>
                <h4 className="panel-title">Your New Token</h4>
              </div>
              <div className="panel-body">
                <p>This information will only be available here, for the duration of this session</p>
                <p>Access Key: {this.state.latest_token.key}</p>
                <p>Secret Key: {this.state.latest_token.secret}</p>
              </div>
            </div>
          }
        })()}

        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">Secrets</h4>
          </div>
          <div className="panel-body">
            <p>
              These secrets are stored in key value pairs in the database. They are encrypted for security.
              We make all efforts possible to keep your data safe, but we cannot guarantee their complete privacy.
            </p>

            <p>You can access your secrets by using the CLI, simply call the following.</p>
            <pre>
              <code>
                $( simpleci provision-secrets )
              </code>
            </pre>
            <p>They will then be available as environment variables.</p>
          </div>
          <div className="list-group">
            {(() => {
              return this.props.secrets.map((secret) => {
                return <a key={secret.key} className="list-group-item">
                  <span onClick={this.handleRemoveSecret.bind(this, secret.key)} className="close">&times;</span>
                  {secret.key}: {secret.value}
                </a>
              })
            })()}
          </div>

          <div className="panel-footer">
            <div className="row">
              <form onSubmit={this.handleAddSecret.bind(this)}>
                <div className="col-sm-5">
                  <input type="text" className="form-control" name="key" placeholder="key" />
                </div>
                <div className="col-sm-5">
                  <input type="text" className="form-control" name="value" placeholder="value" />
                </div>
                <div className="col-sm-2">
                  <input type="submit" value="Submit" className="btn btn-default pull-right"/>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">Tokens</h4>
          </div>
          <div className="list-group">
            {(() => {
              return this.props.tokens.map((token) => {
                return <a key={token.key} className="list-group-item">
                  <span onClick={this.handleRemoveKey.bind(this, token.key)} className="close">&times;</span>
                  {token.key}
                </a>
              })
            })()}
          </div>

          <div className="panel-footer">
            <div className="row">
              <div className="container-fluid">
                <button onClick={this.handleAddKey.bind(this)} className="btn btn-default pull-right">New</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}
