const clientId = process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID || ''
const redirectUri = process.env.NEXT_PUBLIC_FACEBOOK_REDIRECT_URI || ''

export function getFacebookURL() {
  const rootUrl = 'https://www.facebook.com/v20.0/dialog/oauth'
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'email,public_profile',
    response_type: 'code',
    auth_type: 'rerequest',
  })
  return `${rootUrl}?${params.toString()}`
}
