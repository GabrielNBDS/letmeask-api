import Room from 'App/Models/Room'

class ShowRoomService {
  public static async execute(slug: string) {
    const room = await Room.findByOrFail('slug', slug)

    return room
  }
}

export default ShowRoomService
