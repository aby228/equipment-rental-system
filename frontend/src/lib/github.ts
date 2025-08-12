const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || ''
const redirectUri = process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI || ''

export function getGithubURL() {
  const rootUrl = 'https://github.com/login/oauth/authorize'
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'read:user user:email',
    allow_signup: 'true',
  })
  return `${rootUrl}?${params.toString()}`
}
