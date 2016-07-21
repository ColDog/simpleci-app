import React, {Component} from 'react'
import Store from '../store'
import {observer} from 'mobx-react'

@observer
export default class JobIndexView extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div className="container-fluid">
      <h1>Job Index</h1>
    </div>
  }
}
