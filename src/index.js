import page from 'page'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import JobIndexView from './app2/views/job_index_view'
import JobView from './app2/views/job_view'
import JobDefinitionView from './app2/views/job_definition_view'
import AccountSettingsView from './app2/views/account_settings_view'
import DashboardView from './app2/views/dashboard_view'
import LoginView from './app2/views/login_view'

import Config from './app2/config'
import App from './app2/app'
import Store from './app2/store'


$.fn.serializeObject = function() {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
    if (o[this.name] !== undefined) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || '');
    } else {
      o[this.name] = this.value || '';
    }
  });
  return o;
};

page('/', (ctx) => {
  Store.handleRoute(ctx)
  Store.fetch('users')
  ReactDOM.render(<App user={Store.user} main={<DashboardView users={Store.users} />}/>, document.getElementById('root'))
})

page('/accounts/:account_id', (ctx) => {
  Store.handleRoute(ctx)
  Store.fetch('job_definitions')
  ReactDOM.render(<App user={Store.user} main={<JobIndexView account={Store.account} job_definitions={Store.job_definitions} />}/>, document.getElementById('root'))
})

page('/accounts/:account_id/jobs', (ctx) => {
  Store.handleRoute(ctx)
  Store.fetch('job_definitions')
  ReactDOM.render(<App user={Store.user} main={<JobIndexView account={Store.account} job_definitions={Store.job_definitions} />}/>, document.getElementById('root'))
})

page('/accounts/:account_id/jobs/:job_def_id', (ctx) => {
  Store.handleRoute(ctx)
  Store.find('job_definition', ctx.params.job_def_id)
  Store.fetch('jobs', {query: {job_family: ctx.params.job_def_id}})
  ReactDOM.render(<App user={Store.user} main={<JobDefinitionView account={Store.account} job_definition={Store.job_definition} jobs={Store.jobs} />}/>, document.getElementById('root'))
})

page('/accounts/:account_id/jobs/:job_def_id/config', (ctx) => {
  Store.handleRoute(ctx)
  Store.find('job_definition', ctx.params.job_def_id)
  ReactDOM.render(<App user={Store.user} main={<JobDefinitionConfigView account={Store.account} job_definition={Store.job_definition} />}/>, document.getElementById('root'))  
})

page('/accounts/:account_id/jobs/:job_def_id/:job_id', (ctx) => {
  Store.handleRoute(ctx)
  Store.find('job', ctx.params.job_id).then(() => {
    ReactDOM.render(<App user={Store.user} main={<JobView account={Store.account} job={Store.job} />}/>, document.getElementById('root'))
  })
})

page('/accounts/:account_id/settings', (ctx) => {
  Store.handleRoute(ctx)
  Store.fetch('secrets')
  Store.fetch('tokens')
  ReactDOM.render(<App user={Store.user} main={<AccountSettingsView secrets={Store.secrets} tokens={Store.tokens} account={Store.account} />}/>, document.getElementById('root'))
})

page('/login', () => {
  ReactDOM.render(<App user={null} main={<LoginView />}/>, document.getElementById('root'))
})

page('*', () => {

})

Config.fetchConfig()
  .then(Store.fetchCurrent)
  .then(page.start)
  .catch(() => { page('/login') })
