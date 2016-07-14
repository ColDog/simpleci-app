import React, {Component} from 'react'
import AccountStore from '../store/account_store'
import Tabs from '../components/tabs'
import Builds from '../components/builds'
import JobBranches from '../components/job_branches'
import Branches from '../components/branches'

export default class AccountView extends Component {
  state = {current: null}

  constructor(props) {
    super(props)
  }

  setCurrent(repo) {
    repo.fetchAll().then(() => {
      this.setState({current: repo})
    })
  }

  render() {
    return <div className="container-fluid">
      <div className="row">
        <div className="col-sm-3">
          <ul className="list-group">
          </ul>
          {(() => {
            return AccountStore.currentRepos.map((repo) => {
              var label = "label-default"
              if (repo.last_job && repo.last_job.failed) {
                label = "label-danger"
              } else if (repo.last_job && !repo.last_job.failed) {
                label = "label-success"
              }

              return <li key={repo.id} className="list-group-item" onClick={this.setCurrent.bind(this, repo)}>
                <span className={"label pull-right " + label}>{repo.try('last_job.branch')}</span>
                {repo.name}
              </li>
            })
          })()}
        </div>

        <div className="col-sm-9">
          {(() => {
            if (this.state.current) {
              return <div>
                <h4 className="pull-right">{this.state.current.name}</h4>

                <Tabs
                  tabs={["Overview", "History", "Branches"]}
                  components={[
                    <JobBranches job_branches={this.state.current.job_branches} />,
                    <Builds jobs={this.state.current.jobs} />,
                    <Branches branches={this.state.current.branches} repo={this.state.current} />
                  ]}
                />
              </div>
            }

          })()}

        </div>
      </div>
    </div>
  }
}
