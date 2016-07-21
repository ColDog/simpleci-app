import React, {Component} from 'react'

export default class Sidebar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div id="sidebar">
      <ul className="list-group">
        {(() => {
          return this.props.items.map((item, idx) => {
            return <li className="list-group-item text-center" key={idx} role="presentation"><a href={item.link()}><i className={"fa fa-" + item.icon} /></a></li>
          })
        })()}
      </ul>
    </div>
  }
}
