import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Application from '@ioc:Adonis/Core/Application'

export default class AuthController {
  public guard: string = 'api'
  public options = {
    expiresIn: '7days',
    // expiresAt: '7days',
  }

  public async logout({ auth, response }) {
    await auth.use(this.guard).revoke()
    return response.json({ revoked: true })
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    // Lookup user manually
    const user = await User.query().where('email', email).whereNull('is_deleted').firstOrFail()

    // Verify password
    if (!(await Hash.verify(user.password, password))) {
      return response.badRequest('Invalid credentials')
    }

    // @ts-ignore
    const token = await auth.use(this.guard).generate(user, this.options)
    return response.json({ token })
  }

  public async register({ request, response }: HttpContextContract) {
    const registerSchema = schema.create({
      username: schema.string({}, [
        rules.unique({
          table: 'users',
          column: 'username',
        }),
      ]),
      email: schema.string({}, [
        rules.required(),
        rules.normalizeEmail({
          allLowercase: true,
        }),
        rules.unique({
          table: 'users',
          column: 'email',
        }),
        rules.maxLength(50),
      ]),
      password: schema.string({ trim: true }, [
        rules.required(),
        rules.confirmed(),
        rules.minLength(6),
      ]),
      avatarUrl: schema.file({
        size: '2mb',
        extnames: ['jpg', 'png'],
      }),
    })

    const payload = await request.validate({ schema: registerSchema })
    const avatarUrl = await payload.avatarUrl.move(Application.tmpPath('uploads'))
    console.log(avatarUrl)
    return response.json(payload)
  }
}
