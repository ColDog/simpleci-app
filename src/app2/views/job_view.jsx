import React, {Component} from 'react'
import Tabs from '../components/tabs'
import {observer} from 'mobx-react'
import Store from '../store'


@observer
export default class JobView extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div className="container-fluid">
      <div className="panel panel-default">
        <div className="panel-body">
          {(() => {
            if (this.props.job.complete) {
              return <button className="pull-right btn btn-default">Rebuild</button>
            } else {
              return <button className="pull-right btn btn-default">Cancel</button>
            }
          })()}

          <h4>{this.props.job.key}</h4>
          <h5>{this.props.job.status}</h5>

          <div className="row">
            <div className="col-sm-3">
              <table className="table">
                <tr>
                  <td>Branch</td>
                  <td>{this.props.job.repo.branch}</td>
                </tr>
                <tr>
                  <td>Project</td>
                  <td>{this.props.job.repo.name}</td>
                </tr>
                <tr>
                  <td>Queued</td>
                  <td>{this.props.job.created_at.replace('T', ' ').split('.')[0]}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Tabs  tabs={["Output", "Config"]} components={[
        <div><pre><code>{JSON.stringify(this.props.job.output, null, 2)}</code></pre></div>,
        <div><pre><code>{JSON.stringify(this.props.job.build, null, 2)}</code></pre></div>
      ]} />

    </div>
  }
}
