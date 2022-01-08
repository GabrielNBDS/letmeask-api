import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateRoomValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.minLength(4)]),
  })

  public messages = {
    'name.minLength': 'O campo "nome" deve conter no mínimo 4 caracteres',
    'name.required': 'O campo "nome" não pode estar em branco',
  }
}
