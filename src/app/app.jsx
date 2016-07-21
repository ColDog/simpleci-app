import React, {Component} from 'react'
import Navbar from './../app2/components/navbar'
import Sidebar from './../app2/components/sidebar'
import AccountStore from './store/account_store'

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
            <Sidebar items={[
              {icon: 'building', link: () => { return "/accounts/" + AccountStore.current }},
              {icon: 'plug', link: () => { return "/accounts/" + AccountStore.current + "/configs" }},
            ]} />
            <div id="main">
              {this.props.main}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
