const clientId = process.env.NEXT_PUBLIC_APPLE_CLIENT_ID || '' // Service ID
const redirectUri = process.env.NEXT_PUBLIC_APPLE_REDIRECT_URI || ''

export function getAppleURL() {
  const rootUrl = 'https://appleid.apple.com/auth/authorize'
  const params = new URLSearchParams({
    response_type: 'code',
    response_mode: 'query',
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'name email',
    state: Math.random().toString(36).slice(2),
    nonce: Math.random().toString(36).slice(2),
  })
  return `${rootUrl}?${params.toString()}`
}
