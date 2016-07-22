import React, {Component} from 'react'
import Store from '../store'
import {observer} from 'mobx-react'

@observer
export default class JobIndexView extends Component {
  constructor(props) {
    super(props)
    console.log('props', props)
  }

  render() {
    return <div className="container-fluid">
      <div className="col-sm-3">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">Account</h4>
          </div>
          <div className="list-group">
            <a className="list-group-item active" href={"/accounts/" + this.props.account + "/jobs"}>Jobs</a>
            <a className="list-group-item" href={"/accounts/" + this.props.account + "/settings"}>Settings</a>
            <a className="list-group-item">Subscription</a>
          </div>
        </div>
      </div>

      <div className="col-sm-9">
        {(() => {
          if (this.props.job_definitions.length == 0) {
            return <div className="panel panel-danger">
              <div className="panel-heading">
                <h4 className="panel-title">You don't have any registered jobs!</h4>
              </div>
              <div className="panel-body">
                <p>To register a job, use the instructions explained by the CLI interface.</p>
              </div>
            </div>
          }
        })()}

        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">Pending</h4>
          </div>
          <div className="list-group">
            {(() => {
              return this.props.job_definitions.map((job_def) => {
                if (job_def.state == 'pending') {
                  return <a href={"/accounts/" + this.props.account + "/jobs/" + job_def.name} key={job_def.id} className="list-group-item">
                    <span className={"label pull-right " + "label-success"}>{job_def.name}</span>
                    {job_def.name}
                  </a>
                }
              })
            })()}
          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">Completed</h4>
          </div>
          <div className="list-group">
            {(() => {
              return this.props.job_definitions.map((job_def) => {
                if (job_def.state !== 'pending') {
                  return <a href={"/accounts/" + this.props.account + "/jobs/" + job_def.name} key={job_def.id} className="list-group-item">
                    <span className={"label pull-right " + "label-success"}>{job_def.name}</span>
                    {job_def.name}
                  </a>
                }
              })
            })()}
          </div>
        </div>
      </div>
    </div>
  }
}
