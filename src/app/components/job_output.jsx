import React, {Component} from 'react'
import {ansi_to_html} from 'ansi_up'

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
            <h6 style={{color: cmd.error ? '#d9534f' : '#eee'}} className="output-text" onClick={this.toggleActive.bind(this, idx)}>{cmd.time}s [{cmd.topic}] {cmd.args.substring(0, 110)} {cmd.args.length > 100 ? '...' : ''}</h6>
            {(() => {
              if (this.state.opened[idx]) {
                return <div>
                  <p><small>{cmd.args}</small></p>
                  <ul className="list-unstyled">
                    {cmd.output.map((line, idx) => {
                      return <li key={idx}><small dangerouslySetInnerHTML={{__html: ansi_to_html(line)}} /></li>
                    })}
                  </ul>
                </div>
              }
            })()}
          </div>
        })
      })()}
    </div>
  }
}
