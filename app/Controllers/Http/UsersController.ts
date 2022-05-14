// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class UsersController {
  public async login({ request, response }: HttpContextContract) {
    const newPostSchema = schema.create({})
    const payload = await request.validate({ schema: newPostSchema })
    return response.json(payload)
  }

  public async register({ request, response }: HttpContextContract) {
    const registerSchema = schema.create({})
    const payload = await request.validate({ schema: registerSchema })

    return response.json(payload)
  }
}
