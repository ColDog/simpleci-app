import page from 'page'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import JobIndexView from './app2/views/job_index_view'
import JobView from './app2/views/job_view'
import AccountSettingsView from './app2/views/account_settings_view'
import DashboardView from './app2/views/dashboard_view'
import LoginView from './app2/views/login_view'

import Config from './app2/config'
import App from './app2/app'
import Store from './app2/store'

page('/', (ctx) => {
  Store.handleRoute(ctx)
  Store.fetch('users')
  ReactDOM.render(<App main={<DashboardView users={Store.users} />}/>, document.getElementById('root'))
})

page('/accounts/:account_id', (ctx) => {
  Store.handleRoute(ctx)
  Store.fetch('job_definitions')
  ReactDOM.render(<App main={<JobIndexView job_definitions={Store.job_definitions} />}/>, document.getElementById('root'))
})

page('/accounts/:account_id/jobs', (ctx) => {
  Store.handleRoute(ctx)
  Store.fetch('job_definitions')
  ReactDOM.render(<App main={<JobIndexView job_definitions={Store.job_definitions} />}/>, document.getElementById('root'))
})

page('/accounts/:account_id/jobs/:job_def_id', (ctx) => {
  Store.handleRoute(ctx)
  Store.find('job_definitions/' + ctx.params.job_def_id)
  Store.fetch('jobs', {query: {job_definition_id: ctx.params.job_def_id}})
  ReactDOM.render(<App main={<JobView job_definition={Store.job_definition} />}/>, document.getElementById('root'))
})

page('/accounts/:account_id/settings', (ctx) => {
  Store.handleRoute(ctx)
  Store.fetch('secrets')
  Store.fetch('keys')
  ReactDOM.render(<App main={<AccountSettingsView />}/>, document.getElementById('root'))
})

page('/login', () => {
  ReactDOM.render(<App main={<LoginView />}/>, document.getElementById('root'))
})

page('*', () => {

})

Config.fetchConfig()
  .then(Store.fetchCurrent)
  .then(page.start)
  // .catch(() => { page('/login') })
