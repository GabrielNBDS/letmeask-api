import Room from 'App/Models/Room'

class CloseRoomService {
  public static async execute(id: number) {
    const room = await Room.findOrFail(id)

    room.isOpen = false

    await room.save()

    return room
  }
}

export default CloseRoomService
