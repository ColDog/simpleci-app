import React, {Component} from 'react'

export default class Tabs extends Component {
  state = {active: 0}
  
  constructor(props) {
    super(props)
  }
  
  setActive(idx) {
    this.setState({active: idx})
  }

  render() {
    return <div>
      <ul className="nav nav-tabs">
        {(() => {
          return this.props.tabs.map((tab, idx) => {
            return <li key={idx} role="presentation" className={idx == this.state.active ? "active" : null}>
              <a style={{cursor: 'pointer'}} onClick={this.setActive.bind(this, idx)}>{tab}</a>
            </li>
          })
        })()}
      </ul>
      <div>
        <br />
        {this.props.components[this.state.active]}
      </div>
    </div>
  }
}
