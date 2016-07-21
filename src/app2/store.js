import Config from './config'
import {observable} from 'mobx'

class Store {
  @observable account = 'me'
  @observable user = {}
  @observable teams = []
  @observable job_definitions = []
  @observable jobs = []
  @observable events = []
  @observable tokens = []
  @observable secrets = []

  handleRoute(ctx) {
    if (ctx.params.account_id != this.account) {
      this.account = ctx.params.account_id
    }
  }

  constructor() {
    this.fetchCurrent = this.fetchCurrent.bind(this)
    this.fetch = this.fetch.bind(this)
    this.handleRoute = this.handleRoute.bind(this)
  }

  fetch(resource, params) {
    return new Promise((resolve, reject) => {
      $.ajax({
        method: 'GET',
        url: Config.config.api + '/users/' + this.account + '/' + resource,
        data: params,
        success: (data) => {
          this[resource].replace(data[resource])
          resolve(this[resource])
        },
        error: reject
      })
    })
  }

  fetchCurrent() {
    return new Promise((resolve, reject) => {
      $.ajax({
        method: 'GET',
        url: Config.config.api + '/users/' + this.account,
        success: (data) => {
          this.user = data.user
          resolve(this.user)
        },
        error: reject
      })
    })
  }

}

const singleton = new Store()
window.Store = singleton
export default singleton
