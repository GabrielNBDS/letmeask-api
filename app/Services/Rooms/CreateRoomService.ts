import Room from 'App/Models/Room'

class CreateRoomService {
  public static async execute(name: string) {
    const room = new Room()

    room.name = name
    room.isOpen = true

    await room.save()

    return room
  }
}

export default CreateRoomService
