import Config from '../config/config'

class UserStore {
  current = {}
  teams = null

  constructor() {
    this.fetchCurrent = this.fetchCurrent.bind(this)
    this.fetchTeams = this.fetchTeams.bind(this)
  }

  fetchTeams() {
    return new Promise((resolve, reject) => {
      if (this.teams) {
        resolve(this.teams)
      } else {
        $.get(Config.config.api + '/user/teams', (data) => {
          this.teams = data.teams
          resolve(data)
        })
      }
    })
  }

  fetchCurrent() {
    return new Promise((resolve, reject) => {
      $.get(Config.config.api + '/user', (data) => {
        this.current = data.user
        resolve(data)
      })
    })
  }

}

const singleton = new UserStore()
window.UserStore = singleton
export default singleton
