export default new class Config {
  config = {
    api: 'http://localhost:5000'
  }
  
  fetchConfig() {
    return new Promise((resolve) => {
      resolve()
    })
  }
  
}
