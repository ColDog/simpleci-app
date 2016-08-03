import React, {Component} from 'react'

export default class Navbar extends Component {
  constructor(props) {
    super(props)
    console.log('props', this.props.user ? 'user' : 'none')
  }

  render() {
    return <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="/">SimpleCI</a>
          {(() => {
            if (this.props.user) {
              return <a className="navbar-brand" href={"/accounts/" + this.props.user.id}><b>/ &nbsp;{this.props.user.name}</b></a>
            }
          })()}
        </div>
        <ul className="nav navbar-nav navbar-right">
        </ul>
      </div>
    </nav>
  }
}
