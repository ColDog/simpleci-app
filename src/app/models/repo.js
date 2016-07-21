import Config from '../../app2/config'
import {observable} from 'mobx'
import Job from "./job"
import {all, notify} from '../library/helpers'
import AccountStore from '../store/account_store'

export default class Repo {
  @observable jobs = []
  @observable branches = []
  @observable job_branches = []
  @observable config_id = null

  constructor(repo) {
    Object.assign(this, repo)
    this.fetchJobs = this.fetchJobs.bind(this)
    this.fetchBranches = this.fetchBranches.bind(this)
  }
  
  update(params) {
    return new Promise((resolve, reject) => {
      $.ajax({
        method: 'PATCH',
        url: Config.config.api + '/accounts/' + AccountStore.current + '/repos/' + this.id,
        data: {repo: params},
        success: (data) => {
          Object.assign(this, data.repo)
          resolve(data)
        },
        error: () => {
        }
      })
    })    
  }
  
  buildBranch(branch) {
    return new Promise((resolve, reject) => {
      $.post(Config.config.api + '/repos/' + this.id + '/jobs', {job: {branch: branch}}, (data) => {
        notify('success', 'Jobs Queued')
        resolve(data)
        this.fetchJobs()
      })
    })
  }

  fetch() {
    return new Promise((resolve, reject) => {
      $.get(Config.config.api + '/repos/' + this.id, (data) => {
        this.jobs = data.jobs.map(job => new Job(job))
        this.populateJobBranches()
        resolve(data)
      })
    })
  }
  
  fetchAll() {
    return all([
      this.fetchJobs,
      this.fetchBranches
    ])
  }
  
  fetchJobs() {
    return new Promise((resolve, reject) => {
      $.get(Config.config.api + '/repos/' + this.id + '/jobs', (data) => {
        this.jobs = data.jobs.map(job => new Job(job))
        this.populateJobBranches()
        resolve(data)
      })
    })
  }

  populateJobBranches() {
    var jobBranches = {}
    this.jobs.reverse().forEach((job) => {
      jobBranches[job.branch] = job
    })

    this.job_branches = Object.keys(jobBranches).map((key) => {
      return {name: key, job: jobBranches[key]}
    })
  }

  fetchBranches() {
    return new Promise((resolve, reject) => {
      $.get(Config.config.api + '/repos/' + this.id + '/branches', (data) => {
        this.branches = data.branches
        resolve(data)
      })
    })
  }
  
}
