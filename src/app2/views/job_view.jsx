import React, {Component} from 'react'
import {observer} from 'mobx-react'
import Config from '../config'
import JobOutput from '../components/job_output'


// @observer
export default class JobView extends Component {
  state = {view: 'logs', output: {}, job: null}
  active = true

  constructor(props) {
    super(props)
    this.pollForJob = this.pollForJob.bind(this)
    this.fetchJobOutput = this.fetchJobOutput.bind(this)
  }

  componentWillUnmount() {
    this.active = false
  }

  componentDidMount() {
    this.pollForJob()
  }

  pollForJob() {
    this.fetchJob().then((job) => {
      this.setState({job: job.job})
      this.fetchJobOutput().then((data) => {
        this.setState({output: data})
        if (!this.state.job.complete && !this.state.job.cancelled && this.active) {
          setTimeout(this.pollForJob, 2000)
        }
      })
    })
  }

  fetchJob() {
    return new Promise((resolve, reject) => {
      $.ajax({
        method: 'GET',
        url: Config.config.api + '/api/users/' + this.props.account + '/jobs/' + this.props.job_id,
        xhrFields: {
          withCredentials: true
        },
        success: resolve,
        error: reject
      })
    })
  }

  fetchJobOutput() {
    return new Promise((resolve, reject) => {
      if (!this.state.job.output_url) {
        resolve({})
        return
      }

      $.ajax({
        method: 'GET',
        url: this.state.job.output_url,
        success: resolve,
        error: reject
      })
    })
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
    let job = this.state.job
    if (!job) {
      return <p>loading...</p>
    }

    console.log('output', this.state.output)


    let label = 'label-default'

    if (job.complete) {
      if (job.failed) {
        label = 'label-danger'
      } else {
        label = 'label-success'
      }
    }

    return <div className="container-fluid">
      <div className="row">
        <div className="container-fluid">
          <div className="panel panel-default">
            <div className="panel-body">
              <span className={"pull-right label " + label}>{job.repo.branch}</span>

              <div className="row">
                <div className="container-fluid">
                  <div className="col-sm-3">
                    <h4>{job.key}</h4>
                    <table>
                      <tbody>
                      <tr>
                        <td>Job Family:&nbsp;&nbsp;</td>
                        <td><a href={"/accounts/" + this.props.account + "/jobs/" + job.job_family}>{job.job_family}</a></td>
                      </tr>
                      <tr>
                        <td>Branch:&nbsp;&nbsp;</td>
                        <td>{job.repo.branch}</td>
                      </tr>
                      <tr>
                        <td>Project:&nbsp;&nbsp;</td>
                        <td>{job.repo.project}</td>
                      </tr>
                      <tr>
                        <td>Owner:&nbsp;&nbsp;</td>
                        <td>{job.repo.owner}</td>
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
              return <div className="panel panel-default">
                <div className="panel-heading">
                  <div className="panel-title">Build Logs</div>
                </div>
                <div className="panel-body">
                  {(() => {
                    if (this.state.output['Commands']) {
                      return <JobOutput output={this.state.output['Commands']} />
                    }
                  })()}
                </div>
              </div>
            } else if (this.state.view == 'config') {
              return <div className="panel panel-default">
                <div className="panel-heading">
                  <div className="panel-title">Build Configuration</div>
                </div>
                <div className="panel-body">
                  <pre><code>{JSON.stringify(job, null, 2)}</code></pre>
                </div>
              </div>
            } else {
              return <h5>Coming Soon!</h5>
            }
          })()}
        </div>
      </div>
    </div>
  }
}
