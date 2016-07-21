import React, {Component} from 'react'
import {observer} from 'mobx-react'

@observer
export default class JobView extends Component {
  state = {view: 'logs'}

  constructor(props) {
    super(props)
  }

  setView(view) {
    this.setState({view: view})
  }

  currentView(view) {
    if (this.state.view == view) {
      return ' active'
    } else {
      return ''
    }
  }

  render() {
    let label = 'label-default'

    if (this.props.job.complete) {
      if (this.props.job.failed) {
        label = 'label-danger'
      } else {
        label = 'label-success'
      }
    }

    console.log('key', this.props.job.key)
    return <div className="container-fluid">
      <div className="row">
        <div className="container-fluid">
          <div className="panel panel-default">
            <div className="panel-body">
              <span className={"pull-right label " + label}>{this.props.job.repo.branch}</span>

              <div className="row">
                <div className="container-fluid">
                  <div className="col-sm-3">
                    <h4>{this.props.job.key}</h4>
                    <table>
                      <tbody>
                      <tr>
                        <td>Branch:&nbsp;&nbsp;</td>
                        <td>{this.props.job.repo.branch}</td>
                      </tr>
                      <tr>
                        <td>Project:&nbsp;&nbsp;</td>
                        <td>{this.props.job.repo.project}</td>
                      </tr>
                      <tr>
                        <td>Owner:&nbsp;&nbsp;</td>
                        <td>{this.props.job.repo.owner}</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-3">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">Build</h4>
            </div>
            <div className="list-group">
              <a className={"list-group-item" + this.currentView('logs')} onClick={this.setView.bind(this, 'logs')}>Logs</a>
              <a className={"list-group-item" + this.currentView('config')} onClick={this.setView.bind(this, 'config')}>Config</a>
              <a className={"list-group-item" + this.currentView('coverage')} onClick={this.setView.bind(this, 'coverage')}>Coverage</a>
            </div>
          </div>
        </div>

        <div className="col-sm-9">
          {(() => {
            if (this.state.view == 'logs') {
              return <pre><code>...</code></pre>
            } else if (this.state.view == 'config') {
              return <pre><code>{JSON.stringify(this.props.job.build, null, 2)}</code></pre>
            } else {
              return <h5>Coming Soon!</h5>
            }
          })()}
        </div>
      </div>
    </div>
  }
}
