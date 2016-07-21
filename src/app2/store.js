import Config from './config'
import {observable} from 'mobx'

class Store {
  @observable account = 'me'
  @observable user = {}
  @observable users = []
  @observable job_definitions = []
  @observable jobs = []
  @observable job = {}
  @observable job_definition = {}
  @observable events = []
  @observable tokens = []
  @observable secrets = []

  handleRoute(ctx) {
    if (ctx.params.account_id && ctx.params.account_id != this.account) {
      this.account = ctx.params.account_id
    }
  }

  constructor() {
    this.fetchCurrent = this.fetchCurrent.bind(this)
    this.fetch = this.fetch.bind(this)
    this.handleRoute = this.handleRoute.bind(this)
  }
  
  find(resource, id) {
    return new Promise((resolve, reject) => {
      $.ajax({
        method: 'GET',
        url: Config.config.api + '/api/users/' + this.account + '/' + resource + 's/' + id,
        xhrFields: {
          withCredentials: true
        },
        success: (data) => {
          Object.keys(data[resource]).forEach((key) => {
            this[resource][key] = data[resource][key]
          })
          resolve(this[resource])
        },
        error: reject
      })
    })
  }

  fetch(resource, params) {
    return new Promise((resolve, reject) => {
      $.ajax({
        method: 'GET',
        url: Config.config.api + '/api/users/' + this.account + '/' + resource,
        xhrFields: {
          withCredentials: true
        },
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
        url: Config.config.api + '/api/users/' + this.account,
        xhrFields: {
          withCredentials: true
        },
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
