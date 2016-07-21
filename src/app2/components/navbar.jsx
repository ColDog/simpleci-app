import React, {Component} from 'react'
import UserStore from '../../app/store/user_store'

export default class Navbar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="/">SimpleCI</a>
        </div>
        <ul className="nav navbar-nav navbar-right">
          <li><a href="/config">config</a></li>
          <li><a href="#">{UserStore.current.username}</a></li>
        </ul>
      </div>
    </nav>
  }
}
