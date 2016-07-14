import page from 'page'
import React from 'react'
import ReactDOM from 'react-dom'

import DashboardView from './app/views/dashboard_view'
import AccountView from './app/views/account_view'
import ConfigView from './app/views/config_view'
import JobView from './app/views/job_view'
import App from './app/app'

import UserStore from './app/store/user_store'
import AccountStore from './app/store/account_store'
import Config from './app/config/config'
import Job from "./app/models/job";

Object.defineProperty(Object.prototype, 'try', {
  value: function(key) {
    try {
      return Function('ctx', 'return ctx.' + key)(this)
    } catch (e) {
      return null
    }
  },
  enumerable: false
});


page('/', () => {
  UserStore.fetchTeams().then(() => {
    ReactDOM.render(<App main={<DashboardView />}/>, document.getElementById('root'))
  })
})

page('/repos/:repo_id/jobs/:job_id', (ctx) => {
  Job.find(ctx.params.repo_id, ctx.params.job_id).then((job) => {
    ReactDOM.render(<App main={<JobView job={job} />}/>, document.getElementById('root'))
  })
})

page('/accounts/:account', (ctx) => {
  AccountStore.fetchRepos(ctx.params.account).then(() => {
    ReactDOM.render(<App main={<AccountView />}/>, document.getElementById('root'))
  })
})

page('/accounts/:account/configs', (ctx) => {
  AccountStore.fetchConfigs(ctx.params.account).then(() => {
    ReactDOM.render(<App main={<ConfigView />}/>, document.getElementById('root'))
  })
})

Config.fetchConfig()
  .then(UserStore.fetchCurrent)
  .then(page.start)
