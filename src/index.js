import page from 'page'
import React from 'react'
import ReactDOM from 'react-dom'

import JobIndexView from 'app2/views/job_index_view'
import JobView from 'app2/views/job_view'
import AccountSettingsView from 'app2/views/account_secrets_view'

import Config from './app2/config'
import App from './app2/app'
import Store from './app2/store'

import './styles/main.css'

page('/', () => {
  
  ReactDOM.render(<App main={<DashboardView />}/>, document.getElementById('root'))
})

page('/accounts/:account_id/jobs', () => {
  ReactDOM.render(<App main={<JobIndexView />}/>, document.getElementById('root'))
})

page('/accounts/:account_id/jobs/:job_id', () => {
  ReactDOM.render(<App main={<JobView />}/>, document.getElementById('root'))
})

page('/accounts/:account_id/settings', () => {
  ReactDOM.render(<App main={<AccountSettingsView />}/>, document.getElementById('root'))
})

Config.fetchConfig()
  .then(Store.fetchCurrent)
  .then(page.start)
