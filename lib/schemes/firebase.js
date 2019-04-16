import axios from 'axios'

export default class FirebaseScheme {
  constructor (auth, options) {
    this.$auth = auth
    this.name = options._name

    this.baseUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'
    this.loginUrl = `${this.baseUrl}/verifyPassword?key=${options.apiKey}`
    this.userUrl = `${this.baseUrl}/getAccountInfo?key=${options.apiKey}`

    this.options = Object.assign({}, DEFAULTS, options)
  }

  mounted () {
    this.$auth.syncToken(this.name)

    return this.$auth.fetchUserOnce()
  }

  async login ({ data }) {
    const loginRequestData = Object.assign({}, this.options, data)
    const response = await axios.post(this.loginUrl, loginRequestData)

    this.$auth.setRefreshToken(this.name, response.data.refreshToken)
    this.$auth.setToken(this.name, response.data.idToken)

    return this.$auth.fetchUser()
  }

  async fetchUser () {
    if (!this.$auth.getToken(this.name)) {
      return Promise.resolve()
    }

    const { data } = await axios.post(this.userUrl, { idToken: this.$auth.getToken(this.name) })
    if (data.users[0].disabled) {
      this.logout()
      return Promise.reject(new Error('User has been disabled'))
    }
    this.$auth.setUser(new User(data.users[0]))
  }

  async logout () {
    return this.$auth.reset()
  }
}

class User {
  constructor (user) {
    this.scope = ['admin']
    this.raw = user
    this.uid = user.localId
    this.email = user.email
    this.profileUrl = user.profileUrl
  }
}

const DEFAULTS = {
  projectId: null,
  apiKey: null
}
