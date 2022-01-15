import Room from 'App/Models/Room'

class CloseRoomService {
  public static async execute(room: Room) {
    room.isOpen = false

    await room.save()

    return room
  }
}

export default CloseRoomService
