import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CloseRoomService from 'App/Services/Rooms/CloseRoomService'
import CreateRoomService from 'App/Services/Rooms/CreateRoomService'
import CreateRoomValidator from 'App/Validators/Rooms/CreateRoomValidator'

export default class RoomsController {
  public async store({ request }: HttpContextContract) {
    const { name } = await request.validate(CreateRoomValidator)

    const room = await CreateRoomService.execute(name)

    return room
  }

  public async close({ params }: HttpContextContract) {
    const { id } = params

    const room = await CloseRoomService.execute(id)

    return room
  }
}
