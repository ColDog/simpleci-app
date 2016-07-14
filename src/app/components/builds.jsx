import React, {Component} from 'react'
import {observer} from 'mobx-react'

@observer
export default class Builds extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return <div>
      {(() => {
        return this.props.jobs.map((job) => {
          return <a href={"/repos/" + job.repo.id + "/jobs/" + job.id} key={job.id} className="list-group-item">
            <span className={"label pull-right " + job.label}>{job.branch}</span>
            {job.key}
          </a>
        })
      })()}
    </div>
  }
  
}
