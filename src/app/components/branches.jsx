import React, {Component} from 'react'
import {observer} from 'mobx-react'

@observer
export default class Branches extends Component {
  constructor(props) {
    super(props)
  }

  handleBuildBranch(name) {
    this.props.repo.buildBranch(name)
  }

  render() {
    return <div>
      {(() => {
        return this.props.branches.map((branch) => {
          return <a key={branch.name} onClick={this.handleBuildBranch.bind(this, branch.name)} className="list-group-item">
            <span className={"label pull-right label-default"}>Build</span>
            {branch.name}
          </a>
        })
      })()}
    </div>
  }

}
