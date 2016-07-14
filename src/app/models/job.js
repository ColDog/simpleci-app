import Config from '../config/config'
import {observable} from "../../../node_modules/mobx/lib/mobx";

const pollers = {}

export default class Job {
  @observable output = {}

  constructor(job) {
    Object.assign(this, job)
    this.fetchOutput = this.fetchOutput.bind(this)
  }
  
  static find(repo_id, job_id) {
    return new Promise((resolve) => {
      $.get(Config.config.api + '/repos/' + repo_id + '/jobs/' + job_id, (data) => {
        resolve(new Job(data.job))
      })
    })
  }
  
  get label() {
    var label = "label-default"
    if (this.failed) {
      label = "label-danger"
    } else if (!this.failed) {
      label = "label-success"
    }
    return label
  }

  get status() {
    if (this.cancelled) {
      return 'CANCELLED'
    } else {
      if (this.complete) {
        if (this.failed) {
          return 'FAILED'
        } else {
          return 'SUCCESSFUL'
        }
      } else {
        return 'PENDING'
      }
    }
  }

  fetchOutput() {
    if (this.output_url) {
      if (!this.complete) {
        this.poller()
      }

      return new Promise((resolve) => {
        $.get(this.output_url, (data) => {
          this.output = data
          resolve(data)
        })
      })
    }
  }

  poller() {
    if (!pollers[this.id]) {
      setInterval(this.fetchOutput, 5000)
      pollers[this.id] = true
    }
  }

}
