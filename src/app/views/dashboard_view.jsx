import React, {Component} from 'react'
import UserStore from '../store/user_store'

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
            <a href="/accounts/me" className="list-group-item">
              <h4 className="list-group-item-heading">Personal Account</h4>
              <p className="list-group-item-text">Your personal account</p>
            </a>
            {(() => {
              return UserStore.teams.map((team) => {
                return <a key={team.id} href={"/accounts/" + team.id} className="list-group-item">
                  <h4 className="list-group-item-heading">{team.name}</h4>
                  <p className="list-group-item-text">Team account {team.created_at}</p>
                </a>
              })
            })()}
          </div>

        </div>
      </div>
    </div>
  }
}
