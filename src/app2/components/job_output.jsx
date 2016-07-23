import React, {Component} from 'react'

export default class JobOutput extends Component {
  state = {opened: {}}

  constructor(props) {
    super(props)
  }

  toggleActive(idx) {
    let v = this.state
    v.opened[idx] = !v.opened[idx]
    this.setState(v)
  }

  render() {
    return <div id="output">
      {(() => {
        return this.props.output.map((cmd, idx) => {
          return <div key={idx}>
            <h6 className="output-text" onClick={this.toggleActive.bind(this, idx)}>{cmd.Time}s [{cmd.Topic}] {cmd.Args.substring(0, 110)} {cmd.Args.length > 100 ? '...' : ''}</h6>
            {(() => {
              if (this.state.opened[idx]) {
                return <ul className="te">
                  {cmd.Output.map((line, idx) => {
                    return <li key={idx}><small>{line}</small></li>
                  })}
                </ul>
              }
            })()}
          </div>
        })
      })()}
    </div>
  }
}
