export default new class Config {
  config = {
    api: 'http://localhost:3000'
  }
  
  fetchConfig() {
    return new Promise((resolve) => {
      resolve()
    })
  }
  
}
