import Room from 'App/Models/Room'

class CreateRoomService {
  public static async execute(name: string) {
    const room = await Room.create({ name })

    return room
  }
}

export default CreateRoomService
