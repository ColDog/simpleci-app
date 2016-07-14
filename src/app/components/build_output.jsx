import React, {Component} from 'react'
import {observer} from 'mobx-react'

@observer
export default class BuildOutput extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div>
      <p>Output!</p>
    </div>
  }

}
