import React, {Component} from 'react'
import {observer} from 'mobx-react'
import Store from '../store'


@observer
export default class JobDefinitionView extends Component {
  state = {view: 'jobs'}
  constructor(props) {
    super(props)
  }

  componentWillUnmount() {
    Store.stopPolling('jobs')
  }

  setView(view) {
    this.setState({view: view})
  }

  activeClass(view) {
    if (this.state.view == view) {
      return ' active'
    } else {
      return ''
    }
  }

  listItem(job) {
    let label = 'label-default'

    if (job.complete) {
      if (job.failed) {
        label = 'label-danger'
      } else {
        label = 'label-success'
      }
    }

    return <a href={"/accounts/" + this.props.account + "/jobs/" + job.job_family + '/' + job.key} key={job.id} className="list-group-item">
      <span className={"label pull-right " + label}>{job.repo.branch}</span>
      {job.key}
    </a>
  }

  render() {
    return <div className="container-fluid">
      <div className="col-sm-3">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">{this.props.job_definition.name}</h4>
          </div>
          <div className="list-group">
            <a className={"list-group-item" + this.activeClass('jobs')} onClick={this.setView.bind(this, 'jobs')}>Jobs</a>
            <a className={"list-group-item" + this.activeClass('config')} onClick={this.setView.bind(this, 'config')}>Build Config</a>
          </div>
        </div>
      </div>

      {(() => {

        if (this.state.view == 'config') {
          return <div className="col-sm-9">
            <pre><code>{JSON.stringify(this.props.job_definition, null, 2)}</code></pre>
          </div>
        } else {
          return <div className="col-sm-9">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">Pending</h4>
              </div>
              <div className="list-group">
                {(() => {
                  return this.props.jobs.map((job) => {
                    if (job.state == 'pending') {
                      return this.listItem(job)
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
                  return this.props.jobs.map((job) => {
                    if (job.state !== 'pending') {
                      return this.listItem(job)
                    }
                  })
                })()}
              </div>
            </div>
          </div>
        }

      })()}
    </div>
  }
}
