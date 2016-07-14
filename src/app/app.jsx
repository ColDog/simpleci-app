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
          <Navbar />
        </header>
        <div className="boxed">
          <div id="content-container">
            {this.props.main}
          </div>
        </div>
      </div>
    )
  }
}
