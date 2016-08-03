import React, {Component} from 'react'
import Navbar from './components/navbar'

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="container" className="effect mainnav-lg">
        <header id="navbar">
          <Navbar user={this.props.user} />
        </header>
        <div className="boxed">
          <div id="content-container">
            <div id="main">
              {this.props.main}
            </div>
          </div>
        </div>
      </div>
    )
  }
}