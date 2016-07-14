import React, {Component} from 'react'
import {observer} from 'mobx-react'

@observer
export default class JobBranches extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div>
      {(() => {
        return this.props.job_branches.map((branch) => {
          return <a href={"/repos/" + branch.job.repo.id + "/jobs/" + branch.job.id} key={branch.job.id} className="list-group-item">
            <span className={"label pull-right " + branch.job.label}>{branch.name}</span>
            {branch.job.key}
          </a>
        })
      })()}
    </div>
  }

}
