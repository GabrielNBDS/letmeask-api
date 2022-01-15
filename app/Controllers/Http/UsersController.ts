import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'
import User from 'App/Models/User'

interface GithubAccessTokenResponse {
  access_token: string
}

interface GithubUser {
  name: string
  email: string
  login: string
  avatar_url: string
}

export default class AuthController {
  public async store({ auth, request }: HttpContextContract) {
    const code = request.input('code')

    const url = 'https://github.com/login/oauth/access_token'

    const { data: accessTokenResponse } = await axios.post<GithubAccessTokenResponse>(url, null, {
      params: {
        client_id: Env.get('GITHUB_CLIENT_ID'),
        client_secret: Env.get('GITHUB_CLIENT_SECRET'),
        code,
      },
      headers: {
        Accept: 'application/json',
      },
    })

    const { data: githubUser } = await axios.get<GithubUser>('https://api.github.com/user', {
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}`,
      },
    })

    const user = await User.firstOrCreate(
      {
        login: githubUser.login,
      },
      {
        name: githubUser.name,
        login: githubUser.login,
        email: githubUser.email,
        avatar: githubUser.avatar_url,
        accessToken: accessTokenResponse.access_token,
      }
    )

    const { token } = await auth.use('api').login(user)

    return { token }
  }

  public async destroy({ auth, response }: HttpContextContract) {
    await auth.logout()

    return response.status(204)
  }
}
