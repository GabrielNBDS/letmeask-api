import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateRoomValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string({ trim: true }, [rules.minLength(4)]),
  })

  public messages = {
    'title.minLength': 'O "título" deve conter no mínimo 4 caracteres',
    'title.required': 'O "título" não pode estar em branco',
  }
}
