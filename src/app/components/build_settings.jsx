import React, {Component} from 'react'
import {observer} from 'mobx-react'

@observer
export default class BuildSettings extends Component {
  state = {}

  constructor(props) {
    super(props)
    this.state.value = props.repo.config_id
  }

  handleUpdateConfig(evt) {
    if (evt.key == "Enter") {
      this.props.repo.update({config_id: evt.target.value}).then((data) => {
        this.setState({value: data.repo.config_id})
      }).catch(() => {
        this.forceUpdate()
      })
    }
  }

  updateValue(evt) {
    this.setState({value: evt.target.value})
  }

  render() {
    return <div>
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4 className="panel-title">Configuration</h4>
        </div>
        <div className="panel-body">
          Apply config id: <input type="number" value={this.state.value} onChange={this.updateValue.bind(this)} onKeyDown={this.handleUpdateConfig.bind(this)} />
        </div>
      </div>
    </div>
  }

}
