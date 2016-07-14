
export function all(promises) {
  let count = 0

  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      promise()
        .catch(reject)
        .then(() => {
          console.log('c', count, promises.length, resolve)
          count++
          if (count == promises.length) { resolve() }
        })
    })
  })
}


export function notify(type, message) {
  let id = 'alert-' + Math.random().toString(30).substring(2)
  let alert = `<div id="${id}" class="alert alert-${type}" style="position: fixed; bottom: 20px; right: 20px;">
                  <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                  ${message}
                </div>`

  $('body').append(alert)

  setTimeout(() => { $('#' + id).remove() }, 2000)
}
