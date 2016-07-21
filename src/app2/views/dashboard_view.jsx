import React, {Component} from 'react'
import {observer} from 'mobx-react'

@observer
export default class DashboardView extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div className="container-fluid">
      <div className="row">
        <div className="col-sm-4 col-sm-offset-4">

          <h3>Select An Account</h3>
          <div className="list-group">
            {(() => {
              return this.props.users.map((team) => {
                return <a key={team.id} href={"/accounts/" + team.id} className="list-group-item">
                  <h4 className="list-group-item-heading">{team.name}</h4>
                  <p className="list-group-item-text"> {team.created_at}</p>
                </a>
              })
            })()}
          </div>

        </div>
      </div>
    </div>
  }
}
