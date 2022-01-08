import Room from 'App/Models/Room'

class CreateRoomService {
  public static async execute(title: string) {
    const room = await Room.create({ title })

    return room
  }
}

export default CreateRoomService
