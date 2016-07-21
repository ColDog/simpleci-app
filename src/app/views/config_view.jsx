import React, {Component} from 'react'
import AccountStore from '../store/account_store'

import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/yaml';
import 'brace/theme/github';


export default class ConfigView extends Component {
  state = {current: null, title: null, code: '', saved: false}
  intervalid = null

  constructor(props) {
    super(props)
  }

  handleAddConfig() {
    AccountStore.createConfig({name: 'new config'}).then(() => {
      this.forceUpdate()
    })
  }

  componentDidMount() {
    this.intervalid = setInterval(() => {
      if (this.state.current && !this.state.saved) {
        AccountStore.updateConfig(this.state.current.id, {
          body: this.state.code,
          name: this.state.title
        }).then(() => {
          this.setState({saved: true})
        })
      }
    }, 5000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalid)
  }

  setCurrent(config) {
    this.setState({current: config, title: config.name, code: config.body_yaml})
  }

  render() {
    return <div className="container-fluid">
      <div className="row">
        <div className="col-sm-3">
          <ul className="list-group">
          </ul>
          {(() => {
            return AccountStore.currentConfigs.map((config) => {
              return <li key={config.id} className="list-group-item" onClick={this.setCurrent.bind(this, config)}>
                <a>{config.id}: {config.name}</a>
              </li>
            })
          })()}
        </div>
        <div className="col-sm-9">
          {(() => {
            if (this.state.current) {
              return <div>
                <input value={this.state.title} type="text" className="form-control" onChange={((evt) => { this.setState({title: evt.target.value, saved: false}) }).bind(this)} />
                <hr />
                <AceEditor
                  mode="yaml"
                  theme="github"
                  onChange={((val) => { this.setState({code: val, saved: false}) }).bind(this)}
                  value={this.state.code}
                />
              </div>
            }
          })()}

          {this.state.saved ? this.state.current ? 'saved' : 'saving...' : ''}
        </div>
      </div>

      <button onClick={this.handleAddConfig.bind(this)} className="btn btn-primary btn-circle bottom-corner">
        <span className="glyphicon glyphicon-plus" aria-hidden="true" />
      </button>
    </div>
  }
}
