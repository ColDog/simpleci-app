import Config from '../../app2/config'
import Repo from '../models/repo'

class AccountStore {
  current = 'me'
  repos = {
    me: null
  }
  configs = {
    me: null
  }

  constructor() {
    this.fetchRepos = this.fetchRepos.bind(this)
  }
  
  get currentRepos() {
    return this.repos[this.current]
  }
  
  get currentConfigs() {
    return this.configs[this.current]
  }
  
  createConfig(params) {
    return new Promise((resolve, reject) => {
      $.post(Config.config.api + '/accounts/' + this.current + '/configs', {config: params}, (data) => {
        resolve(data)
        this.fetchConfigs(this.current)
      })
    })
  }
  
  updateConfig(id, params) {
    return new Promise((resolve, reject) => {
      $.ajax({
        method: "PATCH",
        url: Config.config.api + '/accounts/' + this.current + '/configs/' + id,
        data: {config: params},
        success: (data) => {
          resolve(data)
          this.fetchConfigs(this.current)
        },
        error: reject
      })
    })
  }
  
  fetchConfigs(current) {
    this.current = current || 'me'

    return new Promise((resolve, reject) => {
      if (this.repos[this.current]) {
        resolve(this.repos[this.current])
      } else {
        $.get(Config.config.api + '/accounts/' + this.current + '/configs', (data) => {
          this.configs[this.current] = data.configs
          resolve(data)
        })
      }
    })
  }

  fetchRepos(current) {
    this.current = current || 'me'
    return new Promise((resolve, reject) => {
      if (this.repos[this.current]) {
        resolve(this.repos[this.current])
      } else {
        $.get(Config.config.api + '/accounts/' + this.current + '/repos', (data) => {
          this.repos[this.current] = data.repos.map(repo => new Repo(repo))
          resolve(data)
        })
      }
    })
  }

}

const singleton = new AccountStore()
window.UserStore = singleton
export default singleton
